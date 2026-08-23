// ======================================================
// IMPORT MODELS
// ======================================================

// Conversation model import kar rahe hain.
// Isme users aur unke messages ki information store hoti hai.
import { Conversation } from "../models/conversationModel.js";

// Message model import kar rahe hain.
// Isme individual messages store hote hain.
import { Message } from "../models/messageModel.js";


// ======================================================
// IMPORT SOCKET.IO
// ======================================================

// getReceiverSocketId()
// receiver ke userId se uska socketId find karta hai.
//
// io
// real-time message send karne ke liye use hota hai.
import {
    getReceiverSocketId,
    io
} from "../socket/socket.js";


// ======================================================
// SEND MESSAGE
// ======================================================

// Ye controller new message send karta hai.
export const sendMessage = async (req, res) => {

    try {

        // ==================================================
        // GET USER IDs
        // ==================================================

        // Logged-in user ka ID.
        //
        // req.id authentication middleware se aata hai.
        const senderId = req.id;


        // Receiver ka ID URL se aa raha hai.
        //
        // Example:
        //
        // POST /api/v1/message/send/65abc123
        //
        // req.params.id = 65abc123
        const receiverId = req.params.id;


        // Frontend se message text receive kar rahe hain.
        //
        // Example:
        //
        // {
        //     "message": "Hello"
        // }
        const { message } = req.body;


        // ==================================================
        // FIND CONVERSATION
        // ==================================================

        // Check kar rahe hain ki sender aur receiver
        // ke beech conversation already exist karti hai ya nahi.
        //
        // $all ka matlab:
        // participants array ke andar dono IDs honi chahiye.
        const gotConversation = await Conversation.findOne({

            participants: {
                $all: [senderId, receiverId]
            }

        });


        // ==================================================
        // CREATE CONVERSATION IF NOT EXISTS
        // ==================================================

        // Agar conversation mil gayi
        // to usko use karenge.
        //
        // Agar nahi mili
        // to new conversation create karenge.
        let conversation = gotConversation;


        if (!conversation) {

            conversation = await Conversation.create({

                // Conversation mein dono users ki IDs store hongi.
                participants: [
                    senderId,
                    receiverId
                ]

            });

        }


        // ==================================================
        // CREATE NEW MESSAGE
        // ==================================================

        // New message database mein create kar rahe hain.
        //
        // Message model mein:
        //
        // senderId
        // receiverId
        // message
        //
        // store hoga.
        const newMessage = await Message.create({

            senderId,

            receiverId,

            message

        });


        // ==================================================
        // ADD MESSAGE TO CONVERSATION
        // ==================================================

        // Conversation ke messages array mein
        // new message ki _id store kar rahe hain.
        //
        // Hum complete message nahi,
        // sirf uski ObjectId store karte hain.
        conversation.messages.push(newMessage._id);


        // ==================================================
        // SAVE CONVERSATION
        // ==================================================

        // Conversation mein jo change hua hai
        // usko database mein save kar rahe hain.
        //
        // NOTE:
        // Message.create() already message ko save kar chuka hai.
        // Isliye newMessage.save() dobara karne ki zarurat nahi.
        await conversation.save();


        // ==================================================
        // SOCKET.IO - REAL TIME MESSAGE
        // ==================================================

        // Receiver ka socket ID find kar rahe hain.
        //
        // Agar receiver online hai,
        // to socketId milega.
        const receiverSocketId =
            getReceiverSocketId(receiverId);


        // Agar receiver online hai.
        if (receiverSocketId) {

            // Receiver ko real-time "newMessage" event bhejo.
            //
            // Frontend is event ko listen karega.
            io.to(receiverSocketId).emit(
                "newMessage",
                newMessage
            );

        }


        // ==================================================
        // SEND RESPONSE TO SENDER
        // ==================================================

        // HTTP status 201 ka matlab:
        // New resource successfully create hua.
        return res.status(201).json({

            newMessage

        });

    } catch (error) {

        // Agar koi error aaye to console mein print karo.
        console.log(error);

        // Client ko error response bhi dena better hai.
        return res.status(500).json({

            message: "Internal server error"

        });

    }

};



// ======================================================
// GET MESSAGES
// ======================================================

// Ye controller sender aur receiver ke
// purane messages database se fetch karta hai.
export const getMessage = async (req, res) => {

    try {

        // ==================================================
        // GET USER IDs
        // ==================================================

        // Receiver ki ID URL se aa rahi hai.
        const receiverId = req.params.id;


        // Logged-in user ki ID.
        const senderId = req.id;


        // ==================================================
        // FIND CONVERSATION
        // ==================================================

        // Sender aur receiver ke beech
        // existing conversation find kar rahe hain.
        const conversation = await Conversation.findOne({

            participants: {

                // Participants array mein
                // sender aur receiver dono hone chahiye.
                $all: [
                    senderId,
                    receiverId
                ]

            }

        })

        // ==================================================
        // POPULATE MESSAGES
        // ==================================================

        // Conversation ke messages array mein
        // sirf Message ObjectIds stored hain.
        //
        // populate("messages")
        // un ObjectIds ko complete Message documents
        // mein convert karta hai.
        .populate("messages");


        // ==================================================
        // SEND MESSAGES TO FRONTEND
        // ==================================================

        // Agar conversation exist karti hai
        // to messages return honge.
        //
        // Agar conversation nahi hai
        // to undefined return hoga.
        return res.status(200).json(

            conversation?.messages

        );

    } catch (error) {

        // Error console mein print karo.
        console.log(error);

        // Client ko error response.
        return res.status(500).json({

            message: "Internal server error"

        });

    }

};