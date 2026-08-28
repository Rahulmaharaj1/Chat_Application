// ======================================================
// IMPORT REACT
// ======================================================

import React, {
    useEffect,
    useRef
} from "react";


// ======================================================
// IMPORT REDUX
// ======================================================

import {
    useSelector
} from "react-redux";


// ======================================================
// MESSAGE COMPONENT
// ======================================================

const Message = ({ message }) => {

    // ==================================================
    // MESSAGE DOM REFERENCE
    // ==================================================

    // Latest message par automatically scroll karne
    // ke liye useRef ka use kar rahe hain.

    const scroll = useRef();


    // ==================================================
    // REDUX USER DATA
    // ==================================================

    const {
        authUser,
        selectedUser
    } = useSelector(
        store => store.user
    );


    // ==================================================
    // AUTO SCROLL
    // ==================================================

    // Jab message change/add hoga,
    // latest message automatically visible hoga.

    useEffect(() => {

        scroll.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [message]);


    // ==================================================
    // MESSAGE TIME
    // ==================================================

    // Backend/MongoDB se createdAt aata hai.
    //
    // Example:
    //
    // createdAt:
    // "2026-08-28T07:45:20.123Z"
    //
    // Isko browser ke local time mein convert
    // karke display karenge.

    const messageTime = message?.createdAt
        ? new Date(message.createdAt).toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        )
        : "";


    // ==================================================
    // JSX
    // ==================================================

    return (

        <div

            ref={scroll}

            className={`chat ${
                String(message?.senderId) ===
                String(authUser?._id)

                    ? "chat-end"

                    : "chat-start"
            }`}

        >


            {/* ==================================================
                USER PROFILE IMAGE
            ================================================== */}

            <div className="chat-image avatar">

                <div className="w-10 rounded-full">

                    <img

                        alt="Tailwind CSS chat bubble component"

                        src={

                            String(message?.senderId) ===
                            String(authUser?._id)

                                ? authUser?.profilePhoto

                                : selectedUser?.profilePhoto

                        }

                    />

                </div>

            </div>


            {/* ==================================================
                MESSAGE HEADER
            ================================================== */}

            <div className="chat-header">

                <time className="text-xs opacity-50 text-white">

                    {messageTime}

                </time>

            </div>


            {/* ==================================================
                MESSAGE BUBBLE
            ================================================== */}

            <div

                className={`chat-bubble ${
                    String(message?.senderId) !==
                    String(authUser?._id)

                        ? "bg-gray-200 text-black"

                        : ""
                }`}

            >

                {message?.message}

            </div>


        </div>

    );

};


// ======================================================
// EXPORT
// ======================================================

export default Message;