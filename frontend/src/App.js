import Signup from "./components/Signup";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { BASE_URL } from ".";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });

      // Save socket in Redux
      dispatch(setSocket(socketio));

      // Listen for online users
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Cleanup
      return () => {
        socketio.off("getOnlineUsers");
        socketio.close();
        dispatch(setSocket(null));
      };
    } else {
      if (socket) {
        socket.off("getOnlineUsers");
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;