// ===============================
// Import Required Packages
// ===============================

// Import Express framework
import express from "express";

// Import dotenv package
import dotenv from "dotenv";

// Import MongoDB connection function
import connectDB from "./config/database.js";

// Import user routes
import userRoute from "./routes/userRoute.js";

// Import message routes
import messageRoute from "./routes/messageRoute.js";

// Import cookie-parser
import cookieParser from "cookie-parser";

// Import CORS
import cors from "cors";

// Import Express app and HTTP server from socket.js
import { app, server } from "./socket/socket.js";



// ===============================
// Load Environment Variables
// ===============================

dotenv.config();



// ===============================
// Server Port
// ===============================

const PORT = process.env.PORT || 5000;



// ===============================
// Middleware
// ===============================

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Parse JSON data
app.use(express.json());

// Parse cookies
app.use(cookieParser());



// ===============================
// CORS Configuration
// ===============================

// Production frontend URL
// IMPORTANT:
// Do NOT use [ ] or ( ) here.

const corsOption = {
    origin: "https://chat-application-frontend-7art.onrender.com",
    credentials: true
};

// Apply CORS
app.use(cors(corsOption));



// ===============================
// API Routes
// ===============================

// User APIs
app.use("/api/v1/user", userRoute);

// Message APIs
app.use("/api/v1/message", messageRoute);



// ===============================
// Start Server
// ===============================

server.listen(PORT, () => {

    // Connect to MongoDB
    connectDB();

    // Show server message
    console.log(`Server listening on port ${PORT}`);

});