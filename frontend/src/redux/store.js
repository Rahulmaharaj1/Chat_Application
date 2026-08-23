// ======================================================
// Import Redux Toolkit Functions
// ======================================================

// combineReducers() -> multiple reducers ko combine karta hai.
// configureStore() -> Redux store create karta hai.
import { combineReducers, configureStore } from "@reduxjs/toolkit";


// ======================================================
// Import Slice Reducers
// ======================================================

// User related state handle karta hai.
import userReducer from "./userSlice.js";

// Message / chat related state handle karta hai.
import messageReducer from "./messageSlice.js";

// Socket.IO related state handle karta hai.
import socketReducer from "./socketSlice.js";


// ======================================================
// Import Redux Persist
// ======================================================

// Redux Persist Redux state ko browser localStorage
// mein save karta hai.

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";


// ======================================================
// Import Local Storage
// ======================================================

// Redux Persist browser ke localStorage ko
// storage ke roop mein use karega.
import storage from "redux-persist/lib/storage";


// ======================================================
// Redux Persist Configuration
// ======================================================

const persistConfig = {

    // localStorage mein root naam se data save hoga.
    key: "root",

    // Persisted state ka version.
    version: 1,

    // Browser localStorage use hoga.
    storage,

    // IMPORTANT:
    // Socket object ko localStorage mein save nahi karna.
    //
    // Socket object non-serializable hota hai.
    blacklist: ["socket"],
};


// ======================================================
// Combine Reducers
// ======================================================

// Teeno reducers ko ek root reducer mein combine kar rahe hain.

const rootReducer = combineReducers({

    // User state
    user: userReducer,

    // Message state
    message: messageReducer,

    // Socket state
    socket: socketReducer,

});


// ======================================================
// Persist Reducer
// ======================================================

// rootReducer ko Redux Persist ke saath wrap kar rahe hain.
//
// Isse user/message state browser refresh ke baad
// restore ho sakti hai.

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);


// ======================================================
// Create Redux Store
// ======================================================

const store = configureStore({

    // Persisted reducer use kar rahe hain.
    reducer: persistedReducer,


    // ==================================================
    // Middleware
    // ==================================================

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({

            // Redux Toolkit normally check karta hai ki
            // Redux actions/state serializable hain ya nahi.
            serializableCheck: {

                // Redux Persist ke internal actions ko ignore karo.
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,

                    // IMPORTANT:
                    // Is action mein Socket.IO ka Socket object
                    // payload ke andar aa raha hai.
                    "socket/setSocket",
                ],


                // IMPORTANT:
                // Redux state ke andar socket.socket mein
                // Socket.IO ka non-serializable object hai.
                ignoredPaths: [
                    "socket.socket"
                ],

            },

        }),

});


// ======================================================
// Export Store
// ======================================================

// Store ko export kar rahe hain taaki Provider
// ke andar use kar sakein.

export default store;