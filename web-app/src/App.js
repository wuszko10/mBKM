import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import React from "react";
import AppRoutes from "./AppRoutes";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "./context/authProvider";

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
                <ToastContainer />
            </Router>
        </AuthProvider>
    );
}

export default App;

