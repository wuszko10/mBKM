import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";

export const fetchLines = async (token: string) => {

    const response = await axios.get(SERVER_URL + `lines`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
