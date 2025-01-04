import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useTransactionDetail} from "../../../hooks/Transactions/useTransactionDetail";
import Loading from "../../../components/Loading/Loading";
import './style.scss'

const TransactionDetails = () => {
    const { id } = useParams();

    const { loading,
        transaction,
        userTicket,
        relief,
        line,
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
                <h2>Szczegóły transakcji</h2>
                <div className={"transaction-box"}>
                    <div className={"details-box"}>
                        <h3>Transakcja nr {transaction?.number}</h3>
                        <p>Numer biletu: <strong>{userTicket?.number}</strong></p>
                        <p>Użytkownik: <Link to={`/user/${user?.id}`}>{user?.firstName} {user?.lastName}</Link></p>

                        <p>Status transakcji: <strong>{transaction?.status}</strong></p>
                        <p>Numer referencyjny: <strong>{transaction?.referenceId}</strong></p>
                        <p>Metoda płatności: <strong>{metadata.method}</strong></p>
                        <p>Data transakcji: <strong>{new Date(transaction?.paymentDate).toLocaleString()}</strong></p>
                        <p>Kwota transakcji: <strong>{transaction?.finalPrice.toFixed(2)} zł</strong></p>
                        <div className={"date-box"}>
                            <h3>Okres ważności biletu</h3>
                            <p>Ważny od: <strong>{ userTicket?.ticketStartDate ? new Date(userTicket.ticketStartDate).toLocaleString() : '---'}</strong></p>
                            <p>Ważny do: <strong>{ userTicket?.ticketEndDate ? new Date(userTicket.ticketEndDate).toLocaleString() : '---'}</strong></p>
                        </div>
                    </div>
                    <div className={"ticket-box"}>
                        <h3><strong>Bilet {metadata.ticketType} {metadata.period}</strong></h3>
                        <p>Typ: <strong>{relief?.name}</strong></p>
                        <p>Linie: <strong>{metadata.lines}{line?.number !== 'all' ? (": " + line?.name) : ''}</strong>
                        </p>
                        <p>Cena: <strong>{transaction?.finalPrice.toFixed(2)} zł</strong></p>
                        <p>Status: <strong>{metadata.status}</strong></p>
                        <img
                            src={userTicket?.QRCode}
                            alt="QR code for the ticket"
                            className={"qr-code"}
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TransactionDetails;
