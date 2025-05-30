import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import React from "react";
import AppRoutes from "./AppRoutes";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "./context/authProvider";

function App() {
    return (
        <AuthProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AppRoutes />
                <ToastContainer />
            </Router>
        </AuthProvider>
    );
}

export default App;

