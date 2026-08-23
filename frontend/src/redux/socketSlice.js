// ======================================================
// Import createSlice from Redux Toolkit
// ======================================================

// createSlice() is used to create:
// 1. Initial State
// 2. Reducers
// 3. Actions
//
// It automatically generates action creators
// and reducer functions.
import { createSlice } from "@reduxjs/toolkit";


// ======================================================
// Create Socket Slice
// ======================================================

// This slice manages Socket.IO related state.
//
// It stores the active socket connection
// so it can be accessed anywhere in the application.
const socketSlice = createSlice({

    // Unique name of this slice.
    //
    // Generated action type:
    // socket/setSocket
    name: "socket",


    // ==================================================
    // Initial State
    // ==================================================

    // Default state when application starts.
    initialState: {

        // Stores Socket.IO connection object.
        //
        // Initially no connection exists.
        socket: null

    },


    // ==================================================
    // Reducers
    // ==================================================

    reducers: {

        // ----------------------------------------------
        // setSocket Reducer
        // ----------------------------------------------

        // Updates the socket connection.
        //
        // state  -> Current Redux state
        //
        // action -> Contains socket object
        //
        // Example:
        //
        // dispatch(socket))
        //
        // action.payload = socket
        setSocket: (state, action) => {

            // Store socket connection
            // inside Redux.
            state.socket = action.payload;

        }

    }

});


// ======================================================
// Export Actions
// ======================================================

// Export action creator.
//
// Example:
//
// dispatch(socket))
export const { setSocket } = socketSlice.actions;


// ======================================================
// Export Reducer
// ======================================================

// Export reducer so it can be added
// inside configureStore().
export default socketSlice.reducer;