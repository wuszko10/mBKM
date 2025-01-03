import React from 'react';
import '../../styles/style.scss'
import {Link, NavLink} from "react-router-dom";
import { PiNavigationArrowFill} from "react-icons/pi";
import {useAuth} from "../../context/authProvider";
import './style.scss';

const Header = () => {

    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="header-box">
            <div className="header-content">
                <div className="column-div">
                    <Link to="/">
                        <div className="logo">
                            <PiNavigationArrowFill className="logo-icon"/>
                            <h1>mBKM</h1>
                            <p>Admin</p>
                        </div>
                    </Link>

                    <div className="header-menu">

                        <NavLink
                            style={({isActive}) => {
                                return {
                                    color: isActive ? "#002B44" : "white",
                                    backgroundColor: isActive ? "white" : "transparent",
                                };
                            }}
                            to="/">Start</NavLink>

                        <NavLink
                            style={({isActive}) => {
                                return {
                                    color: isActive ? "#002B44" : "white",
                                    backgroundColor: isActive ? "white" : "transparent",
                                };
                            }}
                            to="/tickets">Bilety</NavLink>

                        <NavLink
                            style={({isActive}) => {
                                return {
                                    color: isActive ? "#002B44" : "white",
                                    backgroundColor: isActive ? "white" : "transparent",
                                };
                            }}
                            to="/stops">Przystanki</NavLink>

                        <NavLink
                            style={({isActive}) => {
                                return {
                                    color: isActive ? "#002B44" : "white",
                                    backgroundColor: isActive ? "white" : "transparent",
                                };
                            }}
                            to="/lines">Linie</NavLink>

                        <NavLink
                            style={({isActive}) => {
                                return {
                                    color: isActive ? "#002B44" : "white",
                                    backgroundColor: isActive ? "white" : "transparent",
                                };
                            }}
                            to="/transactions">Transakcje</NavLink>

                        <NavLink
                            style={({isActive}) => {
                                return {
                                    color: isActive ? "#002B44" : "white",
                                    backgroundColor: isActive ? "white" : "transparent",
                                };
                            }}
                            to="/users">Użytkownicy</NavLink>
                    </div>
                </div>

                <div className="header-footer">
                    <div>
                        <button onClick={handleLogout} className="login-btn">
                            Wyloguj się
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
