import axios from "axios";
import { SERVER_URL } from "../../variables.tsx";

export const userLogout = async (userId: string) => {

    const response = await axios.delete(SERVER_URL+`user/logout/?${userId}`);
    return response.data;
};

export const userLogin = async (token: string) => {

    const response = await axios.get(SERVER_URL + `lines`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const userRegister = async (firstName: string, lastName: string, pesel: string, email: string, password: string) => {

    const response = await axios.post(SERVER_URL+'user/create', {
        firstName: firstName,
        lastName: lastName,
        pesel: pesel,
        email: email,
        password: password
    });
    return response.data;
};
