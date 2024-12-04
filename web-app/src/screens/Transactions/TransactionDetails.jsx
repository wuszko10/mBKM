import React from 'react';
import { useParams } from 'react-router-dom';
import { transactions } from '../../assets/data';

const TransactionDetails = () => {
    const { id } = useParams(); // Pobieranie id transakcji z parametru URL
    const transaction = transactions.find((t) => t.id === parseInt(id));

    if (!transaction) {
        return <div>Transakcja nie znaleziona</div>;
    }

    return (
        <div className="main-box">
            <div className="content-box">
                <h2>Szczegóły Transakcji</h2>
                <p><strong>Numer:</strong> {transaction.number}</p>
                <p><strong>Użytkownik:</strong> {transaction.user}</p>
                <p><strong>Kwota:</strong> {transaction.amount}</p>
                <p><strong>Data Zakupu:</strong> {transaction.purchaseDate}</p>
                {/* Możesz dodać więcej szczegółów */}
            </div>
        </div>
    );
};

export default TransactionDetails;
