import React, {useState} from 'react';
import './style.scss'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const URI = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

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

    const [errors, setErrors] = useState({});

    function handleChangeRoute() {
        navigate('/');
        window.location.reload();
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

        axios
            .post(URI + 'user/auth', {
                login: formData.login,
                password: formData.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                handleChangeRoute();
            })
            .catch((error) => {
                const errorMessages = {};
                errorMessages.password =
                    "Given username doesn't exist or the password is wrong!";
                setErrors(errorMessages || {});
                console.log(error);

                toast.error('Błąd logowania', {
                    position: 'top-right',
                    theme: "colored",
                });

                setFormData({
                    login: '',
                    password: '',
                });
            });
    };

    return (
        <div className="login-container">
            <h2>Zaloguj się</h2>
            <form className="form-global">
                <input type="text" id="login" name="login" placeholder="Login" value={formData.email}
                       onChange={handleInputChange}/>
                <input type="password" id="password" name="password" placeholder="Hasło" value={formData.email}
                       onChange={handleInputChange}/>
                <button type="submit" onClick={handleLogin}>Zaloguj się</button>
            </form>
            <p>Nie masz jeszcze konta? <Link to="/signup" className="login-link-text-blue">Zarejestruj się</Link></p>
        </div>
    );
};

export default Login;
