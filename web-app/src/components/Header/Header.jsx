import React, {useState} from 'react';
import '../../styles/style.scss'
import {Link, NavLink} from "react-router-dom";
import { PiNavigationArrowFill} from "react-icons/pi";
import {useAuth} from "../../context/authProvider";
import './style.scss';
import {FiMenu} from "react-icons/fi";
import Modal from "react-modal";

const Header = () => {

    const {logout} = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = (e) => {
        e.stopPropagation();
        logout();
    };

    const renderMenuItems = () => {
        return (
            <div className="header-menu">

                <NavLink
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#002B44" : "white",
                            backgroundColor: isActive ? "white" : "transparent",
                        };
                    }}
                    data-testid="nav-home"
                    to="/">Start</NavLink>

                <NavLink
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#002B44" : "white",
                            backgroundColor: isActive ? "white" : "transparent",
                        };
                    }}
                    data-testid="nav-tickets"
                    to="/tickets">Bilety</NavLink>

                <NavLink
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#002B44" : "white",
                            backgroundColor: isActive ? "white" : "transparent",
                        };
                    }}
                    data-testid="nav-stops"
                    to="/stops">Przystanki</NavLink>

                <NavLink
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#002B44" : "white",
                            backgroundColor: isActive ? "white" : "transparent",
                        };
                    }}
                    data-testid="nav-lines"
                    to="/lines">Linie</NavLink>

                <NavLink
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#002B44" : "white",
                            backgroundColor: isActive ? "white" : "transparent",
                        };
                    }}
                    data-testid="nav-transactions"
                    to="/transactions">Transakcje</NavLink>

                <NavLink
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#002B44" : "white",
                            backgroundColor: isActive ? "white" : "transparent",
                        };
                    }}
                    data-testid="nav-users"
                    to="/users">Użytkownicy</NavLink>
            </div>
        )
    }

    const renderLogoutButton = () => {
        return (
            <div className="header-footer">
                <button onClick={handleLogout} className="login-btn">
                    Wyloguj się
                </button>
            </div>
        )
    }

    const handleMenu = () => {
        setModalOpen(true);
    }

    const close = () => {
        setModalOpen(false);
    }

    return (
        <header className="header-box">
            <div className="header-content">
                <div className="header-items">
                    <Link to="/">
                        <div className="logo-header">
                            <PiNavigationArrowFill data-testid="logo" className="logo-header-icon"/>
                            <h1>mBKM</h1>
                            <p>Admin</p>
                        </div>
                    </Link>

                    <div className={"mobile-menu"} onClick={handleMenu}>
                        <FiMenu size={30} className={"logo-header-icon"} />
                    </div>

                    <div className="desktop-menu">
                        {renderMenuItems()}
                    </div>
                </div>

                <div className="desktop-footer" data-testid="logout-btn" >
                    {renderLogoutButton()}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={close}
                contentLabel={"menu"}
                className="menu-modal-container"
                overlayClassName="menu-popup-overlay"
            >
                <div onClick={close} className={"menu-modal-box"}>
                    {renderMenuItems()}
                    {renderLogoutButton()}
                </div>

            </Modal>

        </header>

    );
};

export default Header;
