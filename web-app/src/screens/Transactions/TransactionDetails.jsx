import React from 'react';
import { useParams } from 'react-router-dom';
import {useTransactionDetail} from "../../hooks/useTransactionDetail";
import Loading from "../../components/Loading";

const TransactionDetails = () => {
    const { id } = useParams();

    const { loading,
        transaction,
        userTicket,
        relief,
        metadata,
        user,
    } = useTransactionDetail(id);


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <h2>Szczegóły Transakcji</h2>
                <p><strong>Numer:</strong> {transaction?.number}</p>
                <p><strong>Użytkownik:</strong> {user?.firstName} {user?.lastName}</p>
                <p><strong>Kwota:</strong> {transaction?.finalPrice.toFixed(2)} zł</p>
                <p><strong>Data zakupu:</strong> {new Date(userTicket?.purchaseDate).toLocaleString()}</p>
                <p><strong>Bilet </strong> {metadata.ticketType}</p>
                <p><strong>lines </strong> {metadata.lines}</p>
                <p><strong>period </strong> {metadata.period}</p>
                <p><strong>relief </strong> {relief?.name}</p>
                <p><strong>status </strong> {metadata.status}</p>
                <p><strong>method </strong> {metadata.method}</p>
                <p><strong>Ważny od:</strong> { userTicket?.ticketStartDate ? new Date(userTicket.ticketStartDate).toLocaleString() : '---'}</p>
                <p><strong>Ważny do:</strong> { userTicket?.ticketEndDate ? new Date(userTicket.ticketEndDate).toLocaleString() : '---'}</p>
            </div>
        </div>
    );
};

export default TransactionDetails;
