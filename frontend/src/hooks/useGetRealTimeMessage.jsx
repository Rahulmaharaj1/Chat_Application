// ======================================================
// Import React Hook
// ======================================================

import { useEffect } from "react";


// ======================================================
// Import Redux
// ======================================================

import {
    useSelector,
    useDispatch
} from "react-redux";


// ======================================================
// Import Redux Action
// ======================================================

import {
    addMessageIfNotExists
} from "../redux/messageSlice";


// ======================================================
// REAL TIME MESSAGE
// ======================================================

const useGetRealTimeMessage = () => {

    // ==================================================
    // SOCKET
    // ==================================================

    const {
        socket
    } = useSelector(
        store => store.socket
    );


    // ==================================================
    // SELECTED USER
    // ==================================================

    const {
        selectedUser
    } = useSelector(
        store => store.user
    );


    // ==================================================
    // REDUX DISPATCH
    // ==================================================

    const dispatch = useDispatch();


    // ==================================================
    // SOCKET LISTENER
    // ==================================================

    useEffect(() => {

        // ------------------------------------------------
        // Socket available nahi hai
        // ------------------------------------------------

        if (!socket) {

            return;

        }


        // ==================================================
        // NEW MESSAGE HANDLER
        // ==================================================

        const handleNewMessage = (newMessage) => {

            // ------------------------------------------------
            // Selected user nahi hai
            // ------------------------------------------------

            if (!selectedUser?._id) {

                return;

            }


            // ==================================================
            // CHECK CURRENT CONVERSATION
            // ==================================================

            // Receiver ke selected chat mein
            // message senderId ke through identify hoga.

            const isCurrentConversation =

                String(newMessage.senderId) ===
                String(selectedUser._id);


            // ------------------------------------------------
            // Agar message current chat ka nahi hai
            // ------------------------------------------------

            if (!isCurrentConversation) {

                return;

            }


            // ==================================================
            // ADD MESSAGE TO REDUX
            // ==================================================

            // Redux reducer:
            //
            // 1. Message ko current chat mein add karega.
            //
            // 2. Message _id check karega.
            //
            // 3. Duplicate message ko prevent karega.

            dispatch(

                addMessageIfNotExists(
                    newMessage
                )

            );

        };


        // ==================================================
        // REGISTER SOCKET LISTENER
        // ==================================================

        socket.on(
            "newMessage",
            handleNewMessage
        );


        // ==================================================
        // CLEANUP SOCKET LISTENER
        // ==================================================

        return () => {

            socket.off(
                "newMessage",
                handleNewMessage
            );

        };


    }, [
        socket,
        selectedUser?._id,
        dispatch
    ]);

};


// ======================================================
// EXPORT
// ======================================================

export default useGetRealTimeMessage;