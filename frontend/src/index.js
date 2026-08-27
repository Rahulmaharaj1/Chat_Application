import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import store from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


// Redux Persist
const persistor = persistStore(store);


// ======================================================
// BACKEND BASE URL
// ======================================================

// Local:
// http://localhost:8080

// Production:
// Render backend URL

export const BASE_URL="https://chat-application-pbxx.onrender.com";


// ======================================================
// React Root
// ======================================================

const root = ReactDOM.createRoot(
    document.getElementById('root')
);


// ======================================================
// Render Application
// ======================================================

root.render(

    <React.StrictMode>

        <Provider store={store}>

            <PersistGate
                loading={null}
                persistor={persistor}
            >

                <App />

                <Toaster />

            </PersistGate>

        </Provider>

    </React.StrictMode>

);