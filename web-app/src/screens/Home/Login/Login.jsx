import React, {useState} from 'react';
import '../../../styles/style.scss'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PiNavigationArrowFill} from "react-icons/pi";
import {userLogin} from "../../../services/Users/user.service";
import {useAuth} from "../../../context/authProvider";
import './style.scss'

const Login = () => {

    const { setToken, setUser } = useAuth();

    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    function handleChangeRoute() {
        toast.success('Zalogowano', {
            position: 'top-right',
            theme: "colored",
        });
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!formData.login || !formData.password) {
            return;
        }

        try {
            const response = await userLogin(formData.login, formData.password)

            if(response) {
                setToken(response.token.token);
                setUser(response.user);

                localStorage.setItem('token', JSON.stringify(response.token.token));
                localStorage.setItem('user', JSON.stringify(response.user));

                handleChangeRoute();
            }
        } catch {
            toast.error('Błąd logowania', {
                position: 'top-right',
                theme: "colored",
            });
        }
    };

    return (
        <div className="login-box">
            <div className="logo logo-login">
                <PiNavigationArrowFill className="logo-icon-login"/>
                <h1>mBKM</h1>
                <p>Admin</p>
            </div>
            <div className="login-container">
                <h2>Zaloguj się</h2>
                <form className="form-global">
                    <input type="text" id="login" name="login" placeholder="Login" value={formData.email}
                           onChange={handleInputChange}/>
                    <input type="password" id="password" name="password" placeholder="Hasło" value={formData.email}
                           onChange={handleInputChange}/>
                    <button type="submit" onClick={handleLogin}>Zaloguj się</button>
                </form>
            </div>
        </div>

    );
};

export default Login;
