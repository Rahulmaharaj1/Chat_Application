import { useEffect } from "react";

import axios from "axios";

import {
    useDispatch
} from "react-redux";

import {
    setOtherUsers
} from "../redux/userSlice";

import {
    BASE_URL
} from "..";


// ======================================================
// GET OTHER USERS
// ======================================================

const useGetOtherUsers = () => {

    const dispatch = useDispatch();


    useEffect(() => {

        const fetchOtherUsers = async () => {

            try {

                // Allow cookies
                axios.defaults.withCredentials = true;


                const res = await axios.get(

                    `${BASE_URL}/api/v1/user`

                );


                console.log(
                    "other users -> ",
                    res.data
                );


                // Store users in Redux

                dispatch(
                    setOtherUsers(res.data)
                );


            } catch (error) {

                console.log(
                    error
                );

            }

        };


        fetchOtherUsers();

    }, [
        dispatch
    ]);

};


export default useGetOtherUsers;