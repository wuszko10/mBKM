import React from 'react';
import { useParams } from 'react-router-dom';
import {users} from './data';

const TransactionDetails = () => {
    const { id } = useParams();
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
        return <div>Transakcja nie znaleziona</div>;
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <h2>Szczegóły użytkownika</h2>
                <div>
                    <div><strong>Id:</strong> {user.id}</div>
                    <div><strong>Username:</strong> {user.username}</div>
                    <div><strong>Imię:</strong> {user.firstName}</div>
                    <div><strong>Nazwisko:</strong> {user.lastName}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Data urodzenia:</strong> {user.birthdate}</div>
                    <div><strong>PESEL:</strong> {user.pesel}</div>
                    <div><strong>Adres:</strong> {user.address}</div>
                    <div><strong>Data rejestracji:</strong> {user.registrationDate}</div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
