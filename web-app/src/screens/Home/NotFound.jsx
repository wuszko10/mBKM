import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="main-box notFound-Box" >
            <h1 style={{fontSize: "100px", color: "black"}}>404</h1>
            <p>Ups, wygląda na to, że nie mamy takiego adresu.</p>
            <Link to="/" className="not-found-button">
                Wróć na stronę główną
            </Link>
        </div>
    );
};

export default NotFound;
