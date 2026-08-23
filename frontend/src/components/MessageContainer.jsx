// ======================================================
// Import React
// ======================================================

// React is required to create React components.
//
// useEffect is imported here, although it is not used
// in this component. It can be removed if unnecessary.
import React, { useEffect } from "react";


// ======================================================
// Import Child Components
// ======================================================

// Component that displays the input box
// for typing and sending messages.
import SendInput from "./SendInput";

// Component that displays all chat messages.
import Messages from "./Messages";


// ======================================================
// Import Redux Hooks
// ======================================================

// useSelector() -> Reads data from Redux Store.
//
// useDispatch() -> Sends actions to Redux Store.
import { useSelector, useDispatch } from "react-redux";


// ======================================================
// Import Redux Action
// ======================================================

// Used to change the currently selected user.
//
// (Not used inside this component currently.)
import { setSelectedUser } from "../redux/userSlice";


// ======================================================
// MessageContainer Component
// ======================================================

const MessageContainer = () => {

    // ==================================================
    // Read Data from Redux
    // ==================================================

    // selectedUser -> User whose chat is currently open.
    //
    // authUser -> Logged-in user.
    //
    // onlineUsers -> Array containing IDs of online users.
    const { selectedUser, authUser, onlineUsers } = useSelector(
        store => store.user
    );


    // Used to dispatch Redux actions.
    const dispatch = useDispatch();


    // ==================================================
    // Check Online Status
    // ==================================================

    // Returns true if selected user's ID
    // exists in onlineUsers array.
    //
    // Example:
    //
    // onlineUsers = ["101","102","103"]
    //
    // selectedUser._id = "102"
    //
    // Result:
    // true
    const isOnline = onlineUsers?.includes(selectedUser?._id);


    // ==================================================
    // JSX
    // ==================================================

    return (

        <>

            {

                // If a user is selected,
                // show chat window.

                selectedUser !== null ? (

                    <div className="md:min-w-[550px] flex flex-col">


                        {/* ===============================
                            Chat Header
                        ================================ */}

                        <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">


                            {/* Avatar */}

                            <div className={`avatar ${isOnline ? "online" : ""}`}>

                                <div className="w-12 rounded-full">

                                    <img
                                        src={selectedUser?.profilePhoto}
                                        alt="user-profile"
                                    />

                                </div>

                            </div>



                            {/* User Details */}

                            <div className="flex flex-col flex-1">

                                <div className="flex justify-between gap-2">

                                    <p>

                                        {selectedUser?.fullName}

                                    </p>

                                </div>

                            </div>

                        </div>



                        {/* ===============================
                            Messages Section
                        ================================ */}

                        <Messages />



                        {/* ===============================
                            Send Message Box
                        ================================ */}

                        <SendInput />

                    </div>

                ) : (

                    // ==================================================
                    // Welcome Screen
                    // ==================================================

                    <div className="md:min-w-[550px] flex flex-col justify-center items-center">

                        <h1 className="text-4xl text-white font-bold">

                            Hi, {authUser?.fullName}

                        </h1>

                        <h1 className="text-2xl text-white">

                            Let's start conversation

                        </h1>

                    </div>

                )

            }

        </>

    );

};


// ======================================================
// Export Component
// ======================================================

export default MessageContainer;