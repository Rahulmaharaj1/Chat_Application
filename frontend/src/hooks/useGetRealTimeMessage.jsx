import { useEffect } from "react";

import {
    useSelector,
    useDispatch
} from "react-redux";

import {
    incrementUnreadCount
} from "../redux/userSlice";

import {
    addMessageIfNotExists
} from "../redux/messageSlice";


// ======================================================
// REAL TIME MESSAGE
// ======================================================

const useGetRealTimeMessage = () => {

    const {
        socket
    } = useSelector(
        store => store.socket
    );

    const {
        selectedUser
    } = useSelector(
        store => store.user
    );

    const dispatch = useDispatch();


    useEffect(() => {

        if (!socket) {
            return;
        }


        // ==================================================
        // NEW MESSAGE HANDLER
        // ==================================================

        const handleNewMessage = (newMessage) => {

            // Current chat mein message hai ya nahi
            const isCurrentConversation =
                selectedUser?._id &&
                String(newMessage.senderId) ===
                String(selectedUser._id);


            // ==================================================
            // CURRENT CHAT
            // ==================================================

            if (isCurrentConversation) {

                dispatch(
                    addMessageIfNotExists(
                        newMessage
                    )
                );

                return;
            }


            // ==================================================
            // OTHER CHAT
            // ==================================================

            // Agar message kisi doosre user se aaya hai
            // to unread notification count +1 karo.

            if (newMessage?.senderId) {

                dispatch(
                    incrementUnreadCount(
                        String(newMessage.senderId)
                    )
                );

            }

        };


        // ==================================================
        // SOCKET LISTENER
        // ==================================================

        socket.on(
            "newMessage",
            handleNewMessage
        );


        // ==================================================
        // CLEANUP
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


export default useGetRealTimeMessage;
