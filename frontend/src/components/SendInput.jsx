// ======================================================
// Import React and useState Hook
// ======================================================

// React -> Used to create React components.
//
// useState() -> Used to store the message
// currently typed by the user.
import React, { useState } from "react";


// ======================================================
// Import Send Icon
// ======================================================

// IoSend is the send button icon.
import { IoSend } from "react-icons/io5";


// ======================================================
// Import Axios
// ======================================================

// Axios is used to send HTTP requests
// to the backend server.
import axios from "axios";


// ======================================================
// Import Redux Hooks
// ======================================================

// useDispatch() -> Used to update Redux Store.
//
// useSelector() -> Used to read data
// from Redux Store.
import { useDispatch, useSelector } from "react-redux";


// ======================================================
// Import Redux Action
// ======================================================

// setMessages() updates the messages
// array inside Redux Store.
import { setMessages } from "../redux/messageSlice";


// ======================================================
// Import Backend Base URL
// ======================================================

// BASE_URL contains backend server URL.
//
// Example:
// http://localhost:8080
import { BASE_URL } from "..";


// ======================================================
// SendInput Component
// ======================================================

const SendInput = () => {

    // ==================================================
    // Local State
    // ==================================================

    // Stores the message currently typed
    // inside the input field.
    const [message, setMessage] = useState("");


    // ==================================================
    // Redux
    // ==================================================

    // Used to dispatch Redux actions.
    const dispatch = useDispatch();


    // Get currently selected user.
    const { selectedUser } = useSelector(
        store => store.user
    );


    // Get all messages from Redux.
    const { messages } = useSelector(
        store => store.message
    );


    // ==================================================
    // Send Message Function
    // ==================================================

    const onSubmitHandler = async (e) => {

        // Prevent page refresh.
        e.preventDefault();

        try {

            // Send POST request to backend.
            //
            // URL Example:
            // /api/v1/message/send/USER_ID
            //
            // Request Body:
            // {
            //     message:"Hello"
            // }

            const res = await axios.post(

                `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,

                {
                    message
                },

                {
                    headers: {
                        "Content-Type": "application/json"
                    },

                    // Send cookies (JWT token)
                    // with request.
                    withCredentials: true
                }

            );


            // ==================================================
            // Update Redux Messages
            // ==================================================

            // Add newly sent message
            // to existing messages array.
            dispatch(

                setMessages([

                    ...messages,

                    res?.data?.newMessage

                ])

            );

        }

        catch (error) {

            console.log(error);

        }


        // ==================================================
        // Clear Input Box
        // ==================================================

        setMessage("");

    };



    // ==================================================
    // JSX
    // ==================================================

    return (

        <form

            onSubmit={onSubmitHandler}

            className="px-4 my-3"

        >

            <div className="w-full relative">

                {/* ============================
                    Message Input
                ============================= */}

                <input

                    value={message}

                    onChange={(e) =>

                        setMessage(e.target.value)

                    }

                    type="text"

                    placeholder="Send a message..."

                    className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"

                />


                {/* ============================
                    Send Button
                ============================= */}

                <button

                    type="submit"

                    className="absolute flex inset-y-0 end-0 items-center pr-4"

                >

                    <IoSend />

                </button>

            </div>

        </form>

    );

};


// ======================================================
// Export Component
// ======================================================

export default SendInput; 