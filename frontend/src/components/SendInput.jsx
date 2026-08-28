// ======================================================
// Import React and useState Hook
// ======================================================

import React, { useState } from "react";


// ======================================================
// Import Send Icon
// ======================================================

import { IoSend } from "react-icons/io5";


// ======================================================
// Import Axios
// ======================================================

import axios from "axios";


// ======================================================
// Import Redux Hooks
// ======================================================

import {
    useDispatch,
    useSelector
} from "react-redux";


// ======================================================
// Import Redux Action
// ======================================================

import {
    addMessageIfNotExists
} from "../redux/messageSlice";


// ======================================================
// Import Backend Base URL
// ======================================================

import { BASE_URL } from "..";


// ======================================================
// SendInput Component
// ======================================================

const SendInput = () => {

    // ==================================================
    // Local State
    // ==================================================

    const [message, setMessage] = useState("");


    // ==================================================
    // Redux
    // ==================================================

    const dispatch = useDispatch();


    // ==================================================
    // Selected User
    // ==================================================

    const {
        selectedUser
    } = useSelector(
        store => store.user
    );


    // ==================================================
    // SEND MESSAGE
    // ==================================================

    const onSubmitHandler = async (e) => {

        // Prevent page refresh.
        e.preventDefault();


        // Empty message send na ho.
        if (!message.trim()) {

            return;

        }


        // Selected user nahi hai
        // to message send nahi karna.
        if (!selectedUser?._id) {

            return;

        }


        try {

            // ==================================================
            // SEND MESSAGE TO BACKEND
            // ==================================================

            const res = await axios.post(

                `${BASE_URL}/api/v1/message/send/${selectedUser._id}`,

                {
                    message: message.trim()
                },

                {
                    headers: {
                        "Content-Type": "application/json"
                    },

                    // JWT cookie send karega.
                    withCredentials: true

                }

            );


            // ==================================================
            // GET NEW MESSAGE
            // ==================================================

            const newMessage =
                res?.data?.newMessage;


            // ==================================================
            // UPDATE REDUX IMMEDIATELY
            // ==================================================

            if (newMessage) {

                dispatch(

                    addMessageIfNotExists(
                        newMessage
                    )

                );

            }


            // ==================================================
            // CLEAR INPUT
            // ==================================================

            setMessage("");


        }

        catch (error) {

            console.log(
                "Send message error:",
                error
            );

        }

    };


    // ======================================================
    // JSX
    // ======================================================

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

                        setMessage(
                            e.target.value
                        )

                    }

                    type="text"

                    placeholder="Send a message..."

                    className="
                        border
                        text-sm
                        rounded-lg
                        block
                        w-full
                        p-3
                        border-zinc-500
                        bg-gray-600
                        text-white
                    "

                />


                {/* ============================
                    Send Button
                ============================= */}

                <button

                    type="submit"

                    className="
                        absolute
                        flex
                        inset-y-0
                        end-0
                        items-center
                        pr-4
                    "

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