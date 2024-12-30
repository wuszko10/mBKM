import React from 'react';
import { useParams } from 'react-router-dom';
import {useUserDetails} from "../../hooks/useUserDetails";
import Loading from "../../components/Loading";

const UserDetails = () => {
    const { id } = useParams();

    const { loading, userDetails } = useUserDetails(id);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <h2>Szczegóły użytkownika</h2>
                <div>
                    <div><strong>Id:</strong> {userDetails.id}</div>
                    <div><strong>Username:</strong> {userDetails.username}</div>
                    <div><strong>Imię:</strong> {userDetails.firstName}</div>
                    <div><strong>Nazwisko:</strong> {userDetails.lastName}</div>
                    <div><strong>Email:</strong> {userDetails.email}</div>
                    <div><strong>Data urodzenia:</strong> {userDetails.birthdate}</div>
                    <div><strong>PESEL:</strong> {userDetails.pesel}</div>
                    <div><strong>Adres:</strong> {userDetails.address}</div>
                    <div><strong>Data rejestracji:</strong> {userDetails.registrationDate}</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
