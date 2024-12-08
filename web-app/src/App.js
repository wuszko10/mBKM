import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import React from "react";
import AppRoutes from "./AppRoutes";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <Router>
            <AppRoutes />
            <ToastContainer />
        </Router>
    );
}

export default App;

