import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";


export const fetchMetadata = async (token: string) => {
    const response = await axios.get(SERVER_URL + `metadata`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
