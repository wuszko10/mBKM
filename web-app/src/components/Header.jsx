//import logo from './images/logo-white-black.png'
import React, {useEffect, useState} from 'react';
import './style.scss'
//import { FaSearch } from 'react-icons/fa';
import {Link} from "react-router-dom";

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <header className="header-box">

            <div >
                <div className="logo">
                    <Link to="/">
                        <p>LOGO</p>
                    </Link>
                </div>

                <div className="header-menu">
                    <ul>
                        <li><Link to="/tickets">Bilety</Link></li>
                        <li><Link to="/transactions">Historia transakcji</Link></li>
                        <li><Link to="/users">Użytkownicy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="header-footer">
                <div >
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="login-btn">
                            Wyloguj się
                        </button>
                    ) : (
                        <Link to="/signin" className="login-btn">
                            Zaloguj się
                        </Link>
                    )}
                </div>
                <hr />
                <p>mBKM <br />Wiktor Uszko © 2024/2025</p>
            </div>


        </header>
    );
};

export default Header;


/*<div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Wyszukaj film w naszej bazie..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="search-button" onClick={handleSearchButtonClick}>
                        <FaSearch />
                    </button>
                </div>

                <div className="login">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="login-btn">
                            Wyloguj się
                        </button>
                    ) : (
                        <Link to="/signin" className="login-btn">
                            Zaloguj się
                        </Link>
                    )}
                </div>*/
