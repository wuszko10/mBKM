import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addTicket = async (ticketData, token) => {
    try {
        const response = await axios.post(URI + 'ticket', {
            type: ticketData.type,
            lines: ticketData.lines,
            period: ticketData.period,
            price: ticketData.price,
            offerStartDate: new Date(ticketData.offerStartDate).toISOString(),
            offerEndDate: ticketData.offerEndDate ? new Date(ticketData.offerEndDate).toISOString() : '',
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Dodano nowy bilet', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const fetchTickets = async (page, pageSize, searchQuery, token) => {

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        searchQuery: searchQuery,
    });

    const response = await axios.get(URI + `tickets/table?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const editTicket = async (id, ticketData, token) => {

    try {
        const response = await axios.post(URI + 'ticket', {
            id: id,
            type: ticketData.type,
            lines: ticketData.lines,
            period: ticketData.period,
            price: ticketData.price,
            offerStartDate: new Date(ticketData.offerStartDate).toISOString(),
            offerEndDate: ticketData.offerEndDate ? new Date(ticketData.offerEndDate).toISOString() : "",
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Zaktualizowano bilet', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 409) {
            toast.warn('Próba stworzenia oferty z nakładającą się datą.', {
                position: 'top-right',
                theme: "colored",
            });
        } else {
            toast.error('Bilet nie został zaktualizowany', {
                position: 'top-right',
                theme: "colored",
            });
        }
    }
};

export const deleteTicket = async (id, token) => {
    try {
        const response = await axios.delete(URI + `ticket/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Bilet został usunięty', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Bilet nie został usunięty', {
            position: 'top-right',
            theme: "colored",
        });
    }
};




