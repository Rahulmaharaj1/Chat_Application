import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================================================
// REGISTER USER
// ======================================================

export const register = async (req, res) => {
    try {

        // Get data from frontend
        const {
            fullName,
            username,
            password,
            confirmPassword,
            gender
        } = req.body;


        // Check all fields
        if (
            !fullName ||
            !username ||
            !password ||
            !confirmPassword ||
            !gender
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check password confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password do not match"
            });
        }


        // Check if username already exists
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                message: "Username already exist. Try different."
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Profile photos
        const maleProfilePhoto =
            "https://i.pravatar.cc/150?img=12";

        const femaleProfilePhoto =
            "https://i.pravatar.cc/150?img=47";


        // Create new user
        await User.create({
            fullName,
            username,
            password: hashedPassword,

            profilePhoto:
                gender === "male"
                    ? maleProfilePhoto
                    : femaleProfilePhoto,

            gender
        });


        // Send success response
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ======================================================
// LOGIN USER
// ======================================================

export const login = async (req, res) => {
    try {

        // Get username and password
        const {
            username,
            password
        } = req.body;


        // Check fields
        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Find user
        const user = await User.findOne({
            username
        });


        // User not found
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }


        // Compare entered password
        // with hashed password in database
        const isPasswordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        // Wrong password
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }


        // Data stored inside JWT
        const tokenData = {
            userId: user._id
        };


        // Create JWT token
        const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d"
            }
        );


        // Send token inside cookie
        return res
            .status(200)
            .cookie(
                "token",
                token,
                {
                    maxAge:
                        1 * 24 * 60 * 60 * 1000,

                    httpOnly: true,

                    // Required for frontend
                    // and backend on different domains
                    sameSite: "none",

                    // Required when sameSite is none
                    secure: true
                }
            )
            .json({
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ======================================================
// LOGOUT USER
// ======================================================

export const logout = (req, res) => {
    try {

        // Delete token cookie
        return res
            .status(200)
            .cookie(
                "token",
                "",
                {
                    maxAge: 0,
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                }
            )
            .json({
                message: "Logged out successfully."
            });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// ======================================================
// GET OTHER USERS
// ======================================================

export const getOtherUsers = async (req, res) => {
    try {

        // User ID comes from authentication middleware
        const loggedInUserId = req.id;


        // Find all users except logged-in user
        const otherUsers = await User
            .find({
                _id: {
                    $ne: loggedInUserId
                }
            })

            // Do not send password to frontend
            .select("-password");


        // Send users
        return res.status(200).json(otherUsers);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};