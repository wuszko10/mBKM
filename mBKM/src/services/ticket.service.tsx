import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../../App.tsx";
import { useAuth } from "../components/Global/AuthContext.tsx";

export const fetchTickets = async (token: string) => {

    const response = await axios.get(SERVER_URL + `tickets`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
