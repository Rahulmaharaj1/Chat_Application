// Import the Mongoose library.
// Mongoose helps connect Node.js with MongoDB
// and allows us to create schemas and models.
import mongoose from "mongoose";


// =====================================================
// User Schema
// =====================================================

// Create a schema for the User collection.
// A schema defines the structure of every user document.
const userModel = new mongoose.Schema(

    {

        // -----------------------------------------
        // Full Name
        // -----------------------------------------

        // Stores the user's full name.
        fullName: {

            // Data type must be String.
            type: String,

            // This field is required.
            required: true

        },


        // -----------------------------------------
        // Username
        // -----------------------------------------

        // Stores the username used for login.
        username: {

            // Data type is String.
            type: String,

            // Username is required.
            required: true,

            // Prevent duplicate usernames.
            // MongoDB creates a unique index.
            unique: true

        },


        // -----------------------------------------
        // Password
        // -----------------------------------------

        // Stores the hashed password.
        // Never store plain-text passwords.
        password: {

            type: String,

            required: true

        },


        // -----------------------------------------
        // Profile Photo
        // -----------------------------------------

        // Stores the profile image URL.
        profilePhoto: {

            type: String,

            // Default value if user
            // doesn't provide one.
            default: ""

        },


        // -----------------------------------------
        // Gender
        // -----------------------------------------

        // Stores the user's gender.
        gender: {

            type: String,

            // Only these values are allowed.
            enum: ["male", "female"],

            required: true

        }

    },

    // =================================================
    // Schema Options
    // =================================================

    {

        // Automatically creates:

        // createdAt
        // updatedAt

        timestamps: true

    }

);


// =====================================================
// Create Model
// =====================================================

// Create the User model.
//
// Model Name:
// User
//
// MongoDB Collection:
// users
//
// Mongoose automatically converts
// "User"
// into
// "users".
export const User = mongoose.model("User", userModel);




//Schema Structure

// User Schema
//       │
//       ├──────────────► fullName (String)
//       │
//       ├──────────────► username (Unique String)
//       │
//       ├──────────────► password (Hashed String)
//       │
//       ├──────────────► profilePhoto (String URL)
//       │
//       ├──────────────► gender (male/female)
//       │
//       ├──────────────► createdAt
//       │
//       └──────────────► updatedAt



//Registration Flow


// User Fills Registration Form
//             │
//             ▼
// Receive Data in Backend
//             │
//             ▼
// Validate Input
//             │
//             ▼
// Check Username Exists?
//       │                 │
//      Yes               No
//       │                 │
//       ▼                 ▼
// Return Error     Hash Password
//                         │
//                         ▼
// Generate Profile Photo
//                         │
//                         ▼
// Create User Document
//                         │
//                         ▼
// Save User in MongoDB
//                         │
//                         ▼
// Return Success Response


// | Field          | Type     | Purpose                                                  |
// | -------------- | -------- | -------------------------------------------------------- |
// | `fullName`     | `String` | Stores the user's full name.                             |
// | `username`     | `String` | Unique username used for login.                          |
// | `password`     | `String` | Stores the **hashed** password (never plain text).       |
// | `profilePhoto` | `String` | URL of the user's profile image.                         |
// | `gender`       | `String` | Restricts values to `"male"` or `"female"` using `enum`. |
// | `createdAt`    | `Date`   | Automatically records when the user document is created. |
// | `updatedAt`    | `Date`   | Automatically updates whenever the document changes.     |
