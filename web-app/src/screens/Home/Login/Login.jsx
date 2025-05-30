import React from 'react';
import '../../../styles/style.scss'
import 'react-toastify/dist/ReactToastify.css';
import {PiNavigationArrowFill} from "react-icons/pi";
import './style.scss'
import {useLoginLogic} from "../../../hooks/Home/useLoginLogic";

const Login = () => {

    const {
        formData,
        handleInputChange,
        handleLogin,
    } = useLoginLogic();

    return (
        <div className="login-box">
            <div className="logo logo-login">
                <PiNavigationArrowFill className="logo-icon-login"/>
                <h1 data-testid="signup-view">mBKM</h1>
                <p>Admin</p>
            </div>
            <div className="login-container">
                <h2>Zaloguj się</h2>
                <form className="form-global">
                    <input type="text" id="login" name="login" placeholder="Login" value={formData.email} data-testid="email-input"
                           onChange={handleInputChange}/>
                    <input type="password" id="password" name="password" placeholder="Hasło" value={formData.email} data-testid="password-input"
                           onChange={handleInputChange}/>
                    <button type="submit" onClick={handleLogin} data-testid="submit-button">Zaloguj się</button>
                </form>
            </div>
        </div>

    );
};

export default Login;
