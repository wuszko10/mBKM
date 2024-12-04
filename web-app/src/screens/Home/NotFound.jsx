import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="main-box notFound-Box" >
            <h1 style={{fontSize: "100px", color: "black"}}>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="not-found-button">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
