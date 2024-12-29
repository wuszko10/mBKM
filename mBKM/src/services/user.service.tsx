import axios from "axios";
import { SERVER_URL } from "../../variables.tsx";

export const userLogout = async (userId: string, token: string | null) => {

    const response = await axios.delete(SERVER_URL+`user/logout/?${userId}?${token}`);
    return response.data;
};

export const userLogin = async (username: string, password: string) => {

    const response = await axios.post(SERVER_URL+'user/auth', {
        email: username,
        password: password
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
