import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";

export const fetchTickets = async (token: string) => {

    const response = await axios.get(SERVER_URL + `tickets`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const validateTicket = async (userTicketId: string, token: string) => {
    const response = await axios.post(SERVER_URL + `user-ticket/validate`, {
        userTicketId: userTicketId,
    },{
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
}

export const fetchUserTickets = async (userId:string, token: string) => {

    const response = await axios.get(SERVER_URL + `user-ticket/user/${userId}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const getUserTicket = async (userTicketId:string, token: string) => {

    const response = await axios.get(SERVER_URL + `user-ticket/${userTicketId}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
