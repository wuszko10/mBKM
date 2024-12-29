import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";

export const fetchStops = async (token: string) => {

    const response = await axios.get(SERVER_URL + `stops`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
