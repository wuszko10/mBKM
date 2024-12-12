import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../../App.tsx";

export const fetchStops = async () => {
    // const token =  await AsyncStorage.getItem('token');
    const token =  storage.getString('token');

    const response = await axios.get(SERVER_URL + `stops`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
