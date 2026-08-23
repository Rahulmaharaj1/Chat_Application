// ======================================================
// Import React and useState Hook
// ======================================================

// React is used to create components.
//
// useState() is used to store the search text.
import React, { useState } from "react";


// ======================================================
// Import Search Icon
// ======================================================

// Search icon displayed inside the search button.
import { BiSearchAlt2 } from "react-icons/bi";


// ======================================================
// Import Child Component
// ======================================================

// Displays the list of all users.
import OtherUsers from "./OtherUsers";


// ======================================================
// Import Axios
// ======================================================

// Axios is used to send HTTP requests
// to the backend.
import axios from "axios";


// ======================================================
// Import Toast Notification
// ======================================================

// Displays success or error popup messages.
import toast from "react-hot-toast";


// ======================================================
// Import React Router
// ======================================================

// Used to navigate between pages.
import { useNavigate } from "react-router-dom";


// ======================================================
// Import Redux Hooks
// ======================================================

// useSelector() -> Reads data from Redux Store.
//
// useDispatch() -> Updates Redux Store.
import { useSelector, useDispatch } from "react-redux";


// ======================================================
// Import Redux Actions
// ======================================================

// Used for updating user information in Redux.
import {
    setAuthUser,
    setOtherUsers,
    setSelectedUser
} from "../redux/userSlice";


// Used for updating messages.
import { setMessages } from "../redux/messageSlice";


// ======================================================
// Import Backend URL
// ======================================================

// Contains backend server URL.
import { BASE_URL } from "..";


// ======================================================
// Sidebar Component
// ======================================================

const Sidebar = () => {

    // ==================================================
    // Search State
    // ==================================================

    // Stores search text.
    const [search, setSearch] = useState("");


    // ==================================================
    // Read Redux Store
    // ==================================================

    // Get all users except logged-in user.
    const { otherUsers } = useSelector(

        store => store.user

    );


    // Used to update Redux Store.
    const dispatch = useDispatch();


    // Used to change pages.
    const navigate = useNavigate();


    // ==================================================
    // Logout Function
    // ==================================================

    const logoutHandler = async () => {

        try {

            // Send logout request.
            const res = await axios.get(

                `${BASE_URL}/api/v1/user/logout`

            );


            // Redirect to login page.
            navigate("/login");


            // Show success message.
            toast.success(res.data.message);


            // Clear logged-in user.
            dispatch(setAuthUser(null));


            // Remove all messages.
            dispatch(setMessages(null));


            // Remove user list.
            dispatch(setOtherUsers(null));


            // Remove selected chat user.
            dispatch(setSelectedUser(null));

        }

        catch (error) {

            console.log(error);

        }

    };


    // ==================================================
    // Search User Function
    // ==================================================

    const searchSubmitHandler = (e) => {

        // Prevent page refresh.
        e.preventDefault();


        // Search user by full name.
        const conversationUser = otherUsers?.find(

            (user) =>

                user.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase())

        );


        // If user exists
        if (conversationUser) {

            // Display only searched user.
            dispatch(

                setOtherUsers([conversationUser])

            );

        }

        else {

            // User not found.
            toast.error("User not found!");

        }

    };


    // ==================================================
    // JSX
    // ==================================================

    return (

        <div className="border-r border-slate-500 p-4 flex flex-col">


            {/* ===============================
                Search Form
            ================================ */}

            <form

                onSubmit={searchSubmitHandler}

                className="flex items-center gap-2"

            >

                {/* Search Input */}

                <input

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                    className="input input-bordered rounded-md"

                    type="text"

                    placeholder="Search..."

                />


                {/* Search Button */}

                <button

                    type="submit"

                    className="btn bg-zinc-700 text-white"

                >

                    <BiSearchAlt2

                        className="w-6 h-6 outline-none"

                    />

                </button>

            </form>


            {/* Divider */}

            <div className="divider px-3"></div>


            {/* User List */}

            <OtherUsers />


            {/* Logout Button */}

            <div className="mt-2">

                <button

                    onClick={logoutHandler}

                    className="btn btn-sm"

                >

                    Logout

                </button>

            </div>

        </div>

    );

};


// ======================================================
// Export Component
// ======================================================

export default Sidebar;