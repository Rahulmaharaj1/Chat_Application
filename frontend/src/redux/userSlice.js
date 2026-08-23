// ======================================================
// Import createSlice from Redux Toolkit
// ======================================================

// createSlice() helps create:
// 1. Initial State
// 2. Reducers
// 3. Actions
//
// All in a single file.
import { createSlice } from "@reduxjs/toolkit";


// ======================================================
// Create User Slice
// ======================================================

// This slice stores all user-related data
// for the chat application.
const userSlice = createSlice({

    // Unique name of this slice.
    //
    // Generated action examples:
    // user/setAuthUser
    // user/setOtherUsers
    name: "user",


    // ==================================================
    // Initial State
    // ==================================================

    // Default values when the application starts.
    initialState: {

        // Stores the currently logged-in user.
        //
        // Example:
        // {
        //   _id,
        //   fullName,
        //   username,
        //   profilePhoto
        // }
        authUser: null,


        // Stores all users except
        // the logged-in user.
        otherUsers: null,


        // Stores the user currently selected
        // for chatting.
        selectedUser: null,


        // Stores IDs of users who are
        // currently online.
        onlineUsers: null,

    },


    // ==================================================
    // Reducers
    // ==================================================

    reducers: {

        // ----------------------------------------------
        // Set Logged-in User
        // ----------------------------------------------

        // Updates the authenticated user.
        //
        // Example:
        //
        // dispatch(setAuthUser(user))
        setAuthUser: (state, action) => {

            state.authUser = action.payload;

        },


        // ----------------------------------------------
        // Set Other Users
        // ----------------------------------------------

        // Stores all available chat users.
        //
        // Example:
        //
        // dispatch(setOtherUsers(users))
        setOtherUsers: (state, action) => {

            state.otherUsers = action.payload;

        },


        // ----------------------------------------------
        // Set Selected User
        // ----------------------------------------------

        // Stores the user currently opened
        // in the chat window.
        //
        // Example:
        //
        // dispatch(setSelectedUser(user))
        setSelectedUser: (state, action) => {

            state.selectedUser = action.payload;

        },


        // ----------------------------------------------
        // Set Online Users
        // ----------------------------------------------

        // Stores users currently online.
        //
        // Example:
        //
        // dispatch(setOnlineUsers(userIds))
        setOnlineUsers: (state, action) => {

            state.onlineUsers = action.payload;

        }

    }

});


// ======================================================
// Export Actions
// ======================================================

// Export action creators.
//
// Usage:
//
// dispatch(setAuthUser(user))
//
// dispatch(setOtherUsers(users))
//
// dispatch(setSelectedUser(user))
//
// dispatch(setOnlineUsers(userIds))
export const {

    setAuthUser,

    setOtherUsers,

    setSelectedUser,

    setOnlineUsers

} = userSlice.actions;


// ======================================================
// Export Reducer
// ======================================================

// Export reducer so it can be added
// to configureStore().
export default userSlice.reducer;