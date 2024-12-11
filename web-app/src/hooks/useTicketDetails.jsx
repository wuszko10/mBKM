import { useState, useEffect } from 'react';
import {fetchTicketDetails, fetchTickets} from '../services/ticket.service';

export const useTicketDetails = (id) => {
    const [ticket, setTicket] = useState({
        type: '',
        lines: '',
        period: '',
        price: '',
        offerStartDate: '',
        id: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchTicketDetails(id)
            .then((data) => {
                setTicket(data);
            })
            .catch((error) => {
                console.error("Failed to fetch ticket", error);
            }).finally(() => {
                setLoading(false);
            });

    }, [id]);

    return {ticket, loading};
};
