// ======================================================
// Import Socket.IO Server
// ======================================================

// Server class is used to create a Socket.IO server
// for real-time communication.
import { Server } from "socket.io";


// ======================================================
// Import HTTP Module
// ======================================================

// Express alone cannot work directly with Socket.IO.
//
// Therefore we create an HTTP server and attach
// both Express and Socket.IO to it.
import http from "http";


// ======================================================
// Import Express
// ======================================================

// Express is used for REST APIs.
import express from "express";


// ======================================================
// Create Express Application
// ======================================================

const app = express();


// ======================================================
// Create HTTP Server
// ======================================================

// Wrap the Express app inside an HTTP server.
//
// Socket.IO needs this server.
const server = http.createServer(app);


// ======================================================
// Create Socket.IO Server
// ======================================================

// Attach Socket.IO to the HTTP server.
//
// CORS allows frontend running on localhost:3000
// to connect with Socket.IO.
const io = new Server(server, {

    cors: {

        origin: ["http://localhost:3000"],

        methods: ["GET", "POST"],

    },

});


// ======================================================
// Store Connected Users
// ======================================================

// Object used to store:
//
// userId  ---> socketId
//
// Example:
//
// {
//    "101": "JHd73Ks",
//    "102": "Ks83jdL",
//    "103": "Pw82LmA"
// }
//
// This helps us send messages
// to a specific user.
const userSocketMap = {};


// ======================================================
// Get Receiver Socket ID
// ======================================================

// Returns socketId using receiver's userId.
//
// Example:
//
// receiverId = "101"
//
// Returns:
//
// "JHd73Ks"
export const getReceiverSocketId = (receiverId) => {

    return userSocketMap[receiverId];

};


// ======================================================
// Listen for New Connections
// ======================================================

// This event runs whenever a client
// connects to Socket.IO.
io.on("connection", (socket) => {

    console.log("User Connected :", socket.id);


    // ==================================================
    // Get User ID
    // ==================================================

    // userId is sent from frontend
    // while connecting.
    //
    // Example:
    //
    // io(BASE_URL,{
    //      query:{
    //          userId:authUser._id
    //      }
    // })
    const userId = socket.handshake.query.userId;


    // ==================================================
    // Save User
    // ==================================================

    // Store mapping:
    //
    // userId ---> socketId
    if (userId !== undefined) {

        userSocketMap[userId] = socket.id;

    }


    // ==================================================
    // Send Online Users
    // ==================================================

    // Object.keys(userSocketMap)
    // returns all connected user IDs.
    //
    // Example:
    //
    // {
    //    101:"abc",
    //    102:"xyz"
    // }
    //
    // becomes
    //
    // ["101","102"]
    //
    // This list is sent to every client.
    io.emit(

        "getOnlineUsers",

        Object.keys(userSocketMap)

    );


    // ==================================================
    // Disconnect Event
    // ==================================================

    // Runs automatically when
    // user closes browser
    // refreshes page
    // loses internet
    // logs out
    socket.on("disconnect", () => {

        console.log("User Disconnected :", socket.id);


        // Remove user from online list.
        delete userSocketMap[userId];


        // Update online users
        // for every connected client.
        io.emit(

            "getOnlineUsers",

            Object.keys(userSocketMap)

        );

    });

});


// ======================================================
// Export
// ======================================================

// app -> Express APIs
//
// io -> Socket.IO Server
//
// server -> HTTP Server
export { app, io, server };