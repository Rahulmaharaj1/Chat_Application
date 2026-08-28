// ======================================================
// Import createSlice from Redux Toolkit
// ======================================================

import { createSlice } from "@reduxjs/toolkit";


// ======================================================
// Create Message Slice
// ======================================================

const messageSlice = createSlice({

    name: "message",


    // ==================================================
    // Initial State
    // ==================================================

    initialState: {

        // Chat messages
        messages: null

    },


    // ==================================================
    // Reducers
    // ==================================================

    reducers: {


        // ==================================================
        // SET MESSAGES
        // ==================================================

        // Existing messages ko Redux mein set karta hai.
        setMessages: (state, action) => {

            state.messages = action.payload;

        },


        // ==================================================
        // ADD MESSAGE IF NOT EXISTS
        // ==================================================

        // Socket.IO se new message receive hone par
        // ye reducer message ko Redux mein add karta hai.
        //
        // Agar same _id already messages mein hai,
        // to duplicate message add nahi hoga.

        addMessageIfNotExists: (state, action) => {

            const newMessage = action.payload;


            // Agar message valid nahi hai
            if (!newMessage || !newMessage._id) {

                return;

            }


            // Agar messages null hain
            if (!state.messages) {

                state.messages = [newMessage];

                return;

            }


            // ==================================================
            // DUPLICATE CHECK
            // ==================================================

            const alreadyExists = state.messages.some(

                message =>
                    String(message._id) ===
                    String(newMessage._id)

            );


            // Same message already exist karta hai
            if (alreadyExists) {

                return;

            }


            // ==================================================
            // ADD NEW MESSAGE
            // ==================================================

            state.messages.push(newMessage);

        }

    }

});


// ======================================================
// Export Actions
// ======================================================

export const {

    setMessages,

    addMessageIfNotExists

} = messageSlice.actions;


// ======================================================
// Export Reducer
// ======================================================

export default messageSlice.reducer;