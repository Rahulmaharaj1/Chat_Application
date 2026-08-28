// ======================================================
// IMPORT REQUIRED PACKAGES
// ======================================================

import { Server } from "socket.io";
import http from "http";
import express from "express";


// ======================================================
// EXPRESS APP
// ======================================================

const app = express();


// ======================================================
// HTTP SERVER
// ======================================================

const server = http.createServer(app);


// ======================================================
// SOCKET.IO SERVER
// ======================================================

const io = new Server(server, {

    cors: {

        // Local frontend
        // + Production Render frontend
        origin: [
            "http://localhost:3000",
            "https://chat-application-frontend-7art.onrender.com"
        ],

        methods: [
            "GET",
            "POST"
        ],

        credentials: true

    }

});


// ======================================================
// USER SOCKET MAP
// ======================================================

// Example:
//
// {
//     "USER_ID_1": "SOCKET_ID_1",
//     "USER_ID_2": "SOCKET_ID_2"
// }
//
// Isse hum userId ke basis par
// uska Socket ID find kar sakte hain.

const userSocketMap = {};


// ======================================================
// GET RECEIVER SOCKET ID
// ======================================================

// Receiver ke userId se
// uska currently connected socketId return karega.

export const getReceiverSocketId = (receiverId) => {

    return userSocketMap[receiverId];

};


// ======================================================
// SOCKET CONNECTION
// ======================================================

io.on("connection", (socket) => {


    // ==================================================
    // SOCKET CONNECTION LOG
    // ==================================================

    // Browser se socket connect hone par
    // Socket ID + User ID terminal mein show hoga.

    const userId =
        socket.handshake.query.userId;


    console.log(
        "User Connected :",
        socket.id,
        "User ID :",
        userId
    );


    // ==================================================
    // SAVE USER SOCKET ID
    // ==================================================

    // Agar User ID available hai
    // to us user ke saath socket ID save karo.

    if (userId !== undefined) {

        userSocketMap[userId] =
            socket.id;

    }


    // ==================================================
    // ONLINE USERS
    // ==================================================

    // Sab connected users ke IDs
    // frontend ko send karo.

    io.emit(
        "getOnlineUsers",
        Object.keys(userSocketMap)
    );


    // ==================================================
    // DISCONNECT
    // ==================================================

    socket.on("disconnect", () => {


        console.log(
            "User Disconnected :",
            socket.id,
            "User ID :",
            userId
        );


        // User ko socket map se remove karo.

        if (userId !== undefined) {

            delete userSocketMap[userId];

        }


        // Updated online users frontend ko bhejo.

        io.emit(
            "getOnlineUsers",
            Object.keys(userSocketMap)
        );


    });


});


// ======================================================
// EXPORT
// ======================================================

export {
    app,
    io,
    server
};