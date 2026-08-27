// ===============================
// Import Required Packages
// ===============================

// Method 1 (CommonJS)
// const express = require("express");

// Method 2 (ES Module)
// Import Express framework to create the server and APIs.
import express from "express";

// Import dotenv package to load environment variables
// from the .env file into process.env.
import dotenv from "dotenv";

// Import the MongoDB connection function.
import connectDB from "./config/database.js";

// Import all user-related routes
// (signup, login, logout, etc.).
import userRoute from "./routes/userRoute.js";

// Import all message-related routes
// (send message, get messages, etc.).
import messageRoute from "./routes/messageRoute.js";

// Import cookie-parser middleware.
// It reads cookies sent by the browser and stores them in req.cookies.
import cookieParser from "cookie-parser";

// Import CORS middleware.
// It allows communication between frontend and backend
// running on different ports or domains.
import cors from "cors";

// Import app and server from socket.js.
// app -> Express application
// server -> HTTP server used for Socket.IO
import { app, server } from "./socket/socket.js";


// ===============================
// Load Environment Variables
// ===============================

// Reads the .env file and stores its values inside process.env.
dotenv.config();


// ===============================
// Server Port
// ===============================

// Read PORT from .env.
// If PORT is not found, use 5000 as default.
const PORT = process.env.PORT || 5000;


// ===============================
// Middleware
// ===============================

// Parses form data
// Example:
// name=Rahul&age=20
// Converts it into:
//
/*
req.body = {
    name: "Rahul",
    age: "20"
}
*/
app.use(express.urlencoded({ extended: true }));


// Parses JSON data
// Example:
/*
{
   "name":"Rahul",
   "age":20
}
*/
// Converts JSON into req.body.
app.use(express.json());


// Parses cookies from incoming requests.
//
// Example:
//
// Cookie:
// token=abc123
//
// After parsing:
//
// req.cookies = {
//      token:"abc123"
// }
app.use(cookieParser());


// ===============================
// CORS Configuration
// ===============================

// Allow requests only from
// https://chat-application-frontend-7art.onrender.com
//
// credentials:true allows cookies,
// authorization headers, etc.
const corsOption = {

    origin: "https://chat-application-frontend-7art.onrender.com",

    credentials: true

};

// Apply CORS middleware
app.use(cors(corsOption));


// ===============================
// API Routes
// ===============================

// All user APIs start with:
//
// /api/v1/user
//
// Examples:
//
// POST /api/v1/user/register
//
// POST /api/v1/user/login
//
// GET /api/v1/user/profile
//
app.use("/api/v1/user", userRoute);


// All message APIs start with:
//
// /api/v1/message
//
// Examples:
//
// POST /api/v1/message/send
//
// GET /api/v1/message/all
//
app.use("/api/v1/message", messageRoute);


// ===============================
// Start Server
// ===============================

// Start the HTTP server on the given PORT.
//
// Callback runs after the server starts successfully.
server.listen(PORT, () => {

    // Connect to MongoDB Atlas.
    connectDB();

    // Display success message.
    console.log(`Server listening on port ${PORT}`);

});










// 1. Import all required packages
//         │
//         ▼
// 2. Load .env file
//         │
//         ▼
// 3. Read PORT number
//         │
//         ▼
// 4. Configure Middleware
//    ├── express.urlencoded()
//    ├── express.json()
//    ├── cookieParser()
//    └── cors()
//         │
//         ▼
// 5. Register Routes
//    ├── /api/v1/user
//    └── /api/v1/message
//         │
//         ▼
// 6. Start HTTP Server
//         │
//         ▼
// 7. Connect MongoDB
//         │
//         ▼
// 8. Server Ready to Accept Requests