import { useEffect } from "react";

import axios from "axios";

import {
    useSelector,
    useDispatch
} from "react-redux";

import {
    setMessages
} from "../redux/messageSlice";

import {
    BASE_URL
} from "..";


// ======================================================
// GET MESSAGES
// ======================================================

const useGetMessages = () => {

    const {
        selectedUser
    } = useSelector(
        store => store.user
    );


    const dispatch = useDispatch();


    useEffect(() => {

        const fetchMessages = async () => {

            try {

                // Allow cookies
                axios.defaults.withCredentials = true;


                const res = await axios.get(

                    `${BASE_URL}/api/v1/message/${selectedUser?._id}`

                );


                dispatch(
                    setMessages(res.data)
                );


            } catch (error) {

                console.log(error);

            }

        };


        // Only call API
        // when a user is selected.

        if (selectedUser?._id) {

            fetchMessages();

        }

    }, [
        selectedUser?._id,
        dispatch
    ]);

};


export default useGetMessages;