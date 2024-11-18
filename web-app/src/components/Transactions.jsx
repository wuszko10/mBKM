import React, {useEffect, useState} from 'react';
import './style.scss'
//import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Transactions = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleChangeRoute = () => {
        navigate('/add');
        window.location.reload();
    };

    return (
        <div className="main-box">
            <section className="sectionGrid">
                <h2>Transactions</h2>
                <h2>Transactions</h2>
                <h2>Transactions</h2>
                <h2>Transactions</h2>
                <h2>Transactions</h2>
                <h2>Transactions</h2>
                <h2>Transactions</h2>
                <h2>Transactions</h2>
            </section>
        </div>
    );
};

export default Transactions;
