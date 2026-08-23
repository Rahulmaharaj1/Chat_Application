import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {

    // useRef ka use message ke DOM element ko access karne ke liye
    // kiya ja raha hai.
    const scroll = useRef();

    // Redux store se logged-in user aur selected user ko nikal rahe hain.
    const { authUser, selectedUser } = useSelector(store => store.user);


    // Jab bhi message change hoga:
    // latest message automatically screen par scroll ho jayega.
    useEffect(() => {

        scroll.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [message]);


    return (

        // ref={scroll}
        // Is div ko scrollIntoView() ke liye reference bana rahe hain.
        //
        // Agar message bhejne wala logged-in user hai:
        // chat-end => message right side
        //
        // Agar doosra user hai:
        // chat-start => message left side
        <div
            ref={scroll}
            className={`chat ${
                message?.senderId === authUser?._id
                    ? 'chat-end'
                    : 'chat-start'
            }`}
        >

            {/* User profile image */}
            <div className="chat-image avatar">

                <div className="w-10 rounded-full">

                    <img
                        alt="Tailwind CSS chat bubble component"

                        // Agar message current logged-in user ne bheja hai
                        // to authUser ki profile photo dikhao.
                        //
                        // Otherwise selected user ki profile photo dikhao.
                        src={
                            message?.senderId === authUser?._id
                                ? authUser?.profilePhoto
                                : selectedUser?.profilePhoto
                        }
                    />

                </div>

            </div>


            {/* Message header */}
            <div className="chat-header">

                {/* Abhi fixed time hai */}
                <time className="text-xs opacity-50 text-white">
                    12:45
                </time>

            </div>


            {/* Actual message */}
            <div
                className={`chat-bubble ${
                    message?.senderId !== authUser?._id
                        ? 'bg-gray-200 text-black'
                        : ''
                }`}
            >

                {/* Message text */}
                {message?.message}

            </div>

        </div>
    );
};

export default Message;