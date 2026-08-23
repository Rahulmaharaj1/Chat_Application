// ======================================================
// Import createSlice from Redux Toolkit
// ======================================================

// createSlice() is used to create:
// 1. Initial State
// 2. Reducers
// 3. Actions
//
// All in a single place.
import { createSlice } from "@reduxjs/toolkit";


// ======================================================
// Create Message Slice
// ======================================================

// A slice represents one portion of the Redux store.
//
// This slice manages all message-related data.
const messageSlice = createSlice({

    // Unique name of the slice.
    // Action types will be prefixed with "message/".
    //
    // Example:
    // message/setMessages
    name: "message",


    // ==================================================
    // Initial State
    // ==================================================

    // Default state when the application starts.
    initialState: {

        // Stores chat messages.
        //
        // Initially no messages are loaded,
        // so value is null.
        messages: null,

    },


    // ==================================================
    // Reducers
    // ==================================================

    // Reducers modify the Redux state.
    reducers: {

        // ----------------------------------------------
        // setMessages Reducer
        // ----------------------------------------------

        // Receives:
        //
        // state  -> Current Redux state
        //
        // action -> Contains payload
        //
        // Example:
        //
        // dispatch(setMessages(data))
        //
        // action.payload = data
        setMessages: (state, action) => {

            // Update messages state
            // with the new data.
            state.messages = action.payload;

        }

    }

});


// ======================================================
// Export Actions
// ======================================================

// Export action creator.
//
// Usage:
//
// dispatch(setMessages(messages))
export const { setMessages } = messageSlice.actions;


// ======================================================
// Export Reducer
// ======================================================

// Export reducer so it can be added
// to configureStore().
export default messageSlice.reducer;