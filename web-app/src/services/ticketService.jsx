import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addTicket = async (ticketData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(URI + 'ticket', {
            type: ticketData.type,
            lines: ticketData.lines,
            period: ticketData.period,
            price: ticketData.price,
            offerStartDate: new Date(ticketData.offerStartDate).toISOString(),
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
        toast.error('Bilet nie został utworzony', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const fetchTickets = async (page, pageSize, searchQuery) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(URI + `tickets/table?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
