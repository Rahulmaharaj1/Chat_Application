// Import Mongoose library.
// Mongoose is used to create schemas, models,
// and interact with the MongoDB database.
import mongoose from "mongoose";


// =====================================================
// Message Schema
// =====================================================

// Create a schema for the Message collection.
// A schema defines the structure of each document.
const messageModel = new mongoose.Schema(

    {

        // -----------------------------------------
        // Sender ID
        // -----------------------------------------

        // Stores the ObjectId of the user
        // who sends the message.
        senderId: {

            // ObjectId is MongoDB's unique identifier.
            type: mongoose.Schema.Types.ObjectId,

            // Reference to User collection.
            // Allows populate() to fetch user details.
            ref: "User",

            // This field is mandatory.
            required: true

        },


        // -----------------------------------------
        // Receiver ID
        // -----------------------------------------

        // Stores the ObjectId of the user
        // who receives the message.
        receiverId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // -----------------------------------------
        // Message Text
        // -----------------------------------------

        // Stores the actual chat message.
        message: {

            type: String,

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

// Create the Message model.
//
// MongoDB Collection Name:
// messages
//
// Mongoose converts "Message"
// into "messages" automatically.
export const Message = mongoose.model("Message", messageModel);



// Message Schema
//       │
//       ▼
// Sender ID (ObjectId)
//       │
//       ▼
// Receiver ID (ObjectId)
//       │
//       ▼
// Message Text (String)
//       │
//       ▼
// createdAt & updatedAt
//       │
//       ▼
// Save into MongoDB




// | Field        | Data Type  | Purpose                                                      |
// | ------------ | ---------- | ------------------------------------------------------------ |
// | `senderId`   | `ObjectId` | Stores the ID of the user who sent the message.              |
// | `receiverId` | `ObjectId` | Stores the ID of the user receiving the message.             |
// | `message`    | `String`   | Stores the actual text of the chat message.                  |
// | `createdAt`  | `Date`     | Automatically stores when the message was created.           |
// | `updatedAt`  | `Date`     | Automatically updates whenever the message document changes. |
