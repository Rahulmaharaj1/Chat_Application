// ======================================================
// Import React Hook
// ======================================================

import { useEffect } from "react";


// ======================================================
// Import Axios
// ======================================================

import axios from "axios";


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
    setMessages
} from "../redux/messageSlice";


// ======================================================
// Import Backend URL
// ======================================================

import {
    BASE_URL
} from "..";


// ======================================================
// GET MESSAGES
// ======================================================

const useGetMessages = () => {

    // ==================================================
    // Get Selected User
    // ==================================================

    const {
        selectedUser
    } = useSelector(
        store => store.user
    );


    // ==================================================
    // Redux Dispatch
    // ==================================================

    const dispatch = useDispatch();


    // ==================================================
    // FETCH MESSAGES
    // ==================================================

    useEffect(() => {

        // ------------------------------------------------
        // If no user is selected
        // then clear messages.
        // ------------------------------------------------

        if (!selectedUser?._id) {

            dispatch(
                setMessages([])
            );

            return;

        }


        // ==================================================
        // API FUNCTION
        // ==================================================

        const fetchMessages = async () => {

            try {

                // ------------------------------------------------
                // Get messages between logged-in user
                // and selected user.
                // ------------------------------------------------

                const res = await axios.get(

                    `${BASE_URL}/api/v1/message/${selectedUser._id}`,

                    {

                        // Send JWT cookie
                        // with the request.
                        withCredentials: true

                    }

                );


                // ==================================================
                // UPDATE REDUX
                // ==================================================

                // Backend se aaye messages
                // Redux Store mein save honge.

                dispatch(

                    setMessages(
                        res.data || []
                    )

                );


            }

            catch (error) {

                console.log(
                    "Get messages error:",
                    error
                );


                // Error hone par
                // messages ko empty rakho.

                dispatch(
                    setMessages([])
                );

            }

        };


        // ==================================================
        // CALL API
        // ==================================================

        fetchMessages();


    }, [
        selectedUser?._id,
        dispatch
    ]);

};


// ======================================================
// EXPORT
// ======================================================

export default useGetMessages;