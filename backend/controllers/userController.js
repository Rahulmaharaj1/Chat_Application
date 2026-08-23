// Import User model.
// This model is used to perform CRUD operations on the users collection.
import { User } from "../models/userModel.js";

// Import bcryptjs.
// It is used to hash passwords before storing them
// and compare passwords during login.
import bcrypt from "bcryptjs";

// Import jsonwebtoken.
// It is used to generate authentication tokens (JWT).
import jwt from "jsonwebtoken";


// =====================================================
// REGISTER CONTROLLER
// =====================================================

export const register = async (req, res) => {

    try {

        // Extract data sent from frontend.
        const {
            fullName,
            username,
            password,
            confirmPassword,
            gender
        } = req.body;


        // -----------------------------------------
        // Validation
        // -----------------------------------------

        // Check if any required field is missing.
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


        // Check whether password and confirm password match.
        if (password !== confirmPassword) {

            return res.status(400).json({
                message: "Password do not match"
            });

        }


        // -----------------------------------------
        // Check Username Already Exists
        // -----------------------------------------

        // Search database for existing username.
        const user = await User.findOne({ username });

        if (user) {

            return res.status(400).json({
                message: "Username already exist. Try different."
            });

        }


        // -----------------------------------------
        // Hash Password
        // -----------------------------------------

        // Convert plain password into encrypted hash.
        const hashedPassword = await bcrypt.hash(password, 10);


        // -----------------------------------------
        // Generate Profile Photo
        // -----------------------------------------

        // const maleProfilePhoto =
        //     `https://avatar.iran.liara.run/public/boy?username=${username}`;

        // const femaleProfilePhoto =
        //     `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const maleProfilePhoto = `https://i.pravatar.cc/150?img=12`;
const femaleProfilePhoto = `https://i.pravatar.cc/150?img=47`;


        // -----------------------------------------
        // Create New User
        // -----------------------------------------

        await User.create({

            fullName,

            username,

            // Store hashed password instead of original password.
            password: hashedPassword,

            // Select profile image according to gender.
            profilePhoto:
                gender === "male"
                    ? maleProfilePhoto
                    : femaleProfilePhoto,

            gender

        });


        // -----------------------------------------
        // Success Response
        // -----------------------------------------

        return res.status(201).json({

            message: "Account created successfully.",

            success: true

        });

    }

    catch (error) {

        console.log(error);

    }

};



// =====================================================
// LOGIN CONTROLLER
// =====================================================

export const login = async (req, res) => {

    try {

        // Receive username and password.
        const { username, password } = req.body;


        // Check empty fields.
        if (!username || !password) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        // -----------------------------------------
        // Find User
        // -----------------------------------------

        const user = await User.findOne({ username });


        // If user doesn't exist.
        if (!user) {

            return res.status(400).json({

                message: "Incorrect username or password",

                success: false

            });

        }


        // -----------------------------------------
        // Compare Password
        // -----------------------------------------

        // Compare entered password with hashed password.
        const isPasswordMatch =
            await bcrypt.compare(password, user.password);


        if (!isPasswordMatch) {

            return res.status(400).json({

                message: "Incorrect username or password",

                success: false

            });

        }


        // -----------------------------------------
        // Create JWT Payload
        // -----------------------------------------

        const tokenData = {

            userId: user._id

        };


        // -----------------------------------------
        // Generate JWT Token
        // -----------------------------------------

        const token = jwt.sign(

            tokenData,

            process.env.JWT_SECRET_KEY,

            {

                expiresIn: "1d"

            }

        );


        // -----------------------------------------
        // Send Cookie
        // -----------------------------------------

        return res

            .status(200)

            .cookie(

                "token",

                token,

                {

                    // Cookie expires after one day.
                    maxAge: 1 * 24 * 60 * 60 * 1000,

                    // Prevent JavaScript from reading cookie.
                    httpOnly: true,

                    // Protect against CSRF attacks.
                    sameSite: "strict"

                }

            )

            .json({

                _id: user._id,

                username: user.username,

                fullName: user.fullName,

                profilePhoto: user.profilePhoto

            });

    }

    catch (error) {

        console.log(error);

    }

};



// =====================================================
// LOGOUT CONTROLLER
// =====================================================

export const logout = (req, res) => {

    try {

        // Remove token cookie.
        return res

            .status(200)

            .cookie("token", "", {

                maxAge: 0

            })

            .json({

                message: "Logged out successfully."

            });

    }

    catch (error) {

        console.log(error);

    }

};



// =====================================================
// GET ALL USERS EXCEPT LOGGED-IN USER
// =====================================================

export const getOtherUsers = async (req, res) => {

    try {

        // Logged-in user's ID
        // (added by authentication middleware).
        const loggedInUserId = req.id;


        // Find every user except the logged-in user.
        const otherUsers = await User

            .find({

                _id: {

                    // $ne = Not Equal
                    $ne: loggedInUserId

                }

            })

            // Remove password field from response.
            .select("-password");


        // Return users.
        return res.status(200).json(otherUsers);

    }

    catch (error) {

        console.log(error);

    }

};








// Complete Authentication Flow

//                 REGISTER
//                     │
//                     ▼
// Receive User Data
//                     │
//                     ▼
// Validate Fields
//                     │
//                     ▼
// Username Exists?
//           │                 │
//          Yes               No
//           │                 │
//  Return Error       Hash Password
//                             │
//                             ▼
//                   Generate Avatar
//                             │
//                             ▼
//                      Save User
//                             │
//                             ▼
//                   Registration Success



// //                 LOGIN
// User Login
//       │
//       ▼
// Receive Username & Password
//       │
//       ▼
// Find User
//       │
//  ┌────┴─────┐
//  │          │
// Not Found  Found
//  │          │
//  ▼          ▼
// Error   Compare Password
//              │
//       ┌──────┴───────┐
//       │              │
//  Incorrect        Correct
//       │              │
//       ▼              ▼
//    Error       Generate JWT
//                     │
//                     ▼
//              Store Token Cookie
//                     │
//                     ▼
//               Login Successful



//                 LOGOUT
// User Clicks Logout
//         │
//         ▼
// Clear JWT Cookie
//         │
//         ▼
// Return Success Message


//Get Other Users Flow

// Logged-in User
//        │
//        ▼
// Read req.id
//        │
//        ▼
// Find All Users
// Except req.id ($ne)
//        │
//        ▼
// Remove Password Field
//        │
//        ▼
// Send User List


// | Method                 | Purpose                                                                   |
// | ---------------------- | ------------------------------------------------------------------------- |
// | `User.findOne()`       | Finds a single user by a condition (e.g., username).                      |
// | `User.create()`        | Creates and saves a new user document.                                    |
// | `bcrypt.hash()`        | Converts a plain-text password into a secure hash.                        |
// | `bcrypt.compare()`     | Checks whether the entered password matches the stored hash.              |
// | `jwt.sign()`           | Creates a signed JSON Web Token for authentication.                       |
// | `res.cookie()`         | Stores the JWT in an HTTP-only cookie on the client.                      |
// | `.select("-password")` | Excludes the `password` field from the query result.                      |
// | `$ne`                  | MongoDB operator meaning "not equal", used to exclude the logged-in user. |
