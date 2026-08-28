import Signup from "./components/Signup";

import "./App.css";

import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";

import HomePage from "./components/HomePage";

import Login from "./components/Login";

import {
    useEffect
} from "react";

import {
    useSelector,
    useDispatch
} from "react-redux";

import io from "socket.io-client";

import {
    setSocket
} from "./redux/socketSlice";

import {
    setOnlineUsers
} from "./redux/userSlice";

import {
    BASE_URL
} from ".";


// ======================================================
// PROTECTED ROUTE
// ======================================================

// Ye check karega ki user login hai ya nahi.
//
// Agar authUser hai:
//     HomePage open hoga.
//
// Agar authUser nahi hai:
//     User ko /login par bhej diya jayega.

const ProtectedRoute = ({ children }) => {

    const {
        authUser
    } = useSelector(
        store => store.user
    );


    // User login nahi hai
    if (!authUser) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // User login hai
    return children;

};


// ======================================================
// ROUTES
// ======================================================

const router = createBrowserRouter([

    // ==================================================
    // HOME PAGE
    // ==================================================

    {
        path: "/",

        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        )

    },


    // ==================================================
    // SIGNUP
    // ==================================================

    {
        path: "/signup",

        element: <Signup />

    },


    // ==================================================
    // LOGIN
    // ==================================================

    {
        path: "/login",

        element: <Login />

    },


    // ==================================================
    // INVALID URL
    // ==================================================

    {
        path: "*",

        element: (
            <Navigate
                to="/"
                replace
            />
        )

    }

]);


// ======================================================
// APP
// ======================================================

function App() {


    const {
        authUser
    } = useSelector(
        store => store.user
    );


    const {
        socket
    } = useSelector(
        store => store.socket
    );


    const dispatch = useDispatch();


    // ==================================================
    // SOCKET CONNECTION
    // ==================================================

    useEffect(() => {


        // ==============================================
        // USER LOGGED IN
        // ==============================================

        if (authUser) {


            // Connect to Render backend

            const socketio = io(
                BASE_URL,
                {

                    query: {

                        userId:
                            authUser._id

                    },

                    withCredentials: true

                }
            );


            // Save socket in Redux

            dispatch(
                setSocket(socketio)
            );


            // ==============================================
            // ONLINE USERS
            // ==============================================

            socketio.on(

                "getOnlineUsers",

                (onlineUsers) => {

                    dispatch(

                        setOnlineUsers(
                            onlineUsers
                        )

                    );

                }

            );


            // ==============================================
            // CLEANUP
            // ==============================================

            return () => {

                socketio.close();

            };

        }


        // ==================================================
        // LOGOUT
        // ==================================================

        else {


            if (socket) {


                socket.close();


                dispatch(
                    setSocket(null)
                );

            }

        }


    }, [
        authUser
    ]);


    // ======================================================
    // UI
    // ======================================================

    return (

        <div
            className="
                p-4
                h-screen
                flex
                items-center
                justify-center
            "
        >

            <RouterProvider
                router={router}
            />

        </div>

    );

}


export default App;