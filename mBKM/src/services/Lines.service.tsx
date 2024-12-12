import axios from 'axios';
import {SERVER_URL} from "../repositories/variables.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchLines = async () => {
    const token =  await AsyncStorage.getItem('token');

    const response = await axios.get(SERVER_URL + `lines`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
