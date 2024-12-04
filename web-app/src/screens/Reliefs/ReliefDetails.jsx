import React from 'react';
import { useParams } from 'react-router-dom';
import {discounts} from "../../assets/data";

const ReliefDetails = () => {
    const { id } = useParams();
    const relief = discounts.find(t => t.id === parseInt(id));

    if (!relief) {
        return <div>Bilet nie znaleziony.</div>;
    }

    return (
        <div className="ticket-details-container">
            <h2>Szczegóły biletu</h2>
            <div className="ticket-details">
                <div className="ticket-detail">
                    <strong>Typ biletu:</strong> {relief.name}
                </div>
                <div className="ticket-detail">
                    <strong>Okres:</strong> {relief.percentage}
                </div>
            </div>
            <button onClick={() => window.history.back()} className="back-button">Wróć</button>
        </div>
    );
};

export default ReliefDetails;
