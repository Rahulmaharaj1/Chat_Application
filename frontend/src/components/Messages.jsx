// ======================================================
// Import React
// ======================================================

// React is used to create functional components.
import React from "react";


// ======================================================
// Import Child Component
// ======================================================

// Message component displays a single chat message.
import Message from "./Message";


// ======================================================
// Import Custom Hooks
// ======================================================

// Fetches all messages between the logged-in user
// and the selected user.
import useGetMessages from "../hooks/useGetMessages";


// ======================================================
// Import Redux
// ======================================================

// useSelector() reads data from the Redux Store.
import { useSelector } from "react-redux";


// ======================================================
// Import Real-Time Message Hook
// ======================================================

// Listens for new messages using Socket.IO.
//
// Whenever a new message is received,
// Redux Store is updated automatically.
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";


// ======================================================
// Messages Component
// ======================================================

const Messages = () => {

    // ==================================================
    // Fetch Messages
    // ==================================================

    // This custom hook fetches all chat messages
    // from the backend whenever the selected user changes.
    useGetMessages();


    // ==================================================
    // Listen for Real-Time Messages
    // ==================================================

    // This hook creates a Socket.IO listener.
    //
    // Whenever another user sends a new message,
    // it is added to Redux automatically.
    useGetRealTimeMessage();


    // ==================================================
    // Read Redux Store
    // ==================================================

    // Get all chat messages from Redux.
    const { messages } = useSelector(

        store => store.message

    );


    // ==================================================
    // JSX
    // ==================================================

    return (

        <div className="px-4 flex-1 overflow-auto">

            {

                // Check if messages exist.
                messages &&

                // Loop through every message.
                messages.map((message) => {

                    return (

                        // Render one Message component
                        // for each message.

                        <Message

                            key={message._id}

                            message={message}

                        />

                    );

                })

            }

        </div>

    );

};


// ======================================================
// Export Component
// ======================================================

export default Messages;