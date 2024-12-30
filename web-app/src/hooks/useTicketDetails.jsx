import { useState, useEffect } from 'react';
import {fetchTicketDetails} from '../services/ticket.service';
import {useAuth} from "../context/authProvider";

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
    const {token} = useAuth();

    useEffect(() => {

        fetchTicketDetails(id, token)
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
