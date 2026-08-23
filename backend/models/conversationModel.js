// Import Mongoose library.
// Mongoose is used to define schemas, create models,
// and interact with MongoDB.
import mongoose from "mongoose";


// =====================================================
// Conversation Schema
// =====================================================

// Create a schema for the Conversation collection.
// A conversation represents a chat between two users.
const conversationModel = new mongoose.Schema(

    {

        // -----------------------------------------
        // Participants
        // -----------------------------------------

        // Stores the users who are part of
        // this conversation.
        //
        // This is an array because a conversation
        // can contain multiple participants.
        //
        // Example:
        // [
        //   user1Id,
        //   user2Id
        // ]
        participants: [

            {

                // MongoDB ObjectId
                type: mongoose.Schema.Types.ObjectId,

                // Reference to User collection.
                // Allows populate("participants")
                // to fetch complete user details.
                ref: "User"

            }

        ],


        // -----------------------------------------
        // Messages
        // -----------------------------------------

        // Stores all message IDs that belong
        // to this conversation.
        //
        // Example:
        // [
        //   message1Id,
        //   message2Id,
        //   message3Id
        // ]
        messages: [

            {

                // MongoDB ObjectId
                type: mongoose.Schema.Types.ObjectId,

                // Reference to Message collection.
                // Allows populate("messages")
                // to retrieve complete message documents.
                ref: "Message"

            }

        ]

    },

    // =================================================
    // Schema Options
    // =================================================

    {

        // Automatically creates:
        //
        // createdAt
        // updatedAt
        timestamps: true

    }

);


// =====================================================
// Create Model
// =====================================================

// Create the Conversation model.
//
// Collection Name:
// conversations
//
// Mongoose automatically converts
// "Conversation"
// into
// "conversations".
export const Conversation = mongoose.model(
    "Conversation",
    conversationModel
);



// User A sends message
//         │
//         ▼
// Find Conversation
//         │
//  ┌──────┴─────────┐
//  │                │
// Exists         Doesn't Exist
//  │                │
//  ▼                ▼
// Use It      Create Conversation
//         │
//         ▼
// Create Message
//         │
//         ▼
// Store Message ID
// Inside Conversation.messages
//         │
//         ▼
// Save Conversation
//         │
//         ▼
// Return Chat Data