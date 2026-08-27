import { useEffect } from "react";

import {
    useSelector,
    useDispatch
} from "react-redux";

import {
    setMessages
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
        messages
    } = useSelector(
        store => store.message
    );


    const dispatch = useDispatch();


    useEffect(() => {

        // Socket available nahi hai
        if (!socket) {

            return;

        }


        // ==================================================
        // NEW MESSAGE
        // ==================================================

        const handleNewMessage = (newMessage) => {

            dispatch(

                setMessages(

                    [
                        ...(messages || []),
                        newMessage
                    ]

                )

            );

        };


        // Listen for new message

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
        messages,
        dispatch
    ]);

};


export default useGetRealTimeMessage;