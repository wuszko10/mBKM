import React from "react";
import { Navigate } from "react-router-dom";
import {isExpired} from "react-jwt";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!isExpired(localStorage.getItem('token'));

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
