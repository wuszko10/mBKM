import React from 'react';
import { useParams } from 'react-router-dom';
import {tickets} from "../../assets/data";

const TicketDetails = () => {
    const { id } = useParams(); // Pobieranie id z URL
    const ticket = tickets.find(t => t.id === parseInt(id));

    if (!ticket) {
        return <div>Bilet nie znaleziony.</div>;
    }

    return (
        <div className="ticket-details-container">
            <h2>Szczegóły biletu</h2>
            <div className="ticket-details">
                <div className="ticket-detail">
                    <strong>Typ biletu:</strong> {ticket.ticketType === 'jednorazowy' ? 'Jednorazowy' : 'Okresowy'}
                </div>
                <div className="ticket-detail">
                    <strong>Okres:</strong> {ticket.period ? `${ticket.period} dni` : 'Brak okresu'}
                </div>
                <div className="ticket-detail">
                    <strong>Liczba linii:</strong> {ticket.lines === 'wszystkie' ? 'Wszystkie linie' : `${ticket.lines} linie`}
                </div>
                <div className="ticket-detail">
                    <strong>Cena:</strong> {ticket.price} PLN
                </div>
                <div className="ticket-detail">
                    <strong>Data rozpoczęcia oferty:</strong> {ticket.offerStartDate}
                </div>
                <div className="ticket-detail">
                    <strong>Data zakończenia oferty:</strong> {ticket.offerEndDate}
                </div>
            </div>
            <button onClick={() => window.history.back()} className="back-button">Wróć</button>
        </div>
    );
};

export default TicketDetails;
