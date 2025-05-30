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

export const UserResetPasswordCheck = async (email: string,checkPesel: string) => {

    const response = await axios.post(SERVER_URL+'user/restore/check', {
        email: email,
        checkPesel: checkPesel
    });
    return response.data;
};

export const UserResetPassword = async (email: string, oldPassword: string, newPassword: string, token: string) => {

    const response = await axios.post(SERVER_URL+'user/reset', {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
    }, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const UserRestorePassword = async (email: string, newPassword: string) => {

    const response = await axios.post(SERVER_URL+'user/restore', {
        email: email,
        newPassword: newPassword,
    });
    return response.data;
};

export const updateAddress = async (id: string, userId: string, fullAddress: string, town: string, postalCode: string, postal: string, token: string)=> {

    const response = await axios.post(SERVER_URL+'user/address/update', {
        id: id,
        userId: userId,
        fullAddress: fullAddress,
        town: town,
        postalCode: postalCode,
        postal: postal,
    }, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;

}

export const userRegister = async (firstName: string, lastName: string, pesel: string, email: string, password: string, fullAddress: string, town: string, postalCode: string, postal: string) => {

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pesel: pesel,
        registrationDate: new Date(Date.now()).toISOString(),
        password: password
    }

    const addressData = {
        userId: '',
        fullAddress: fullAddress,
        town: town,
        postalCode: postalCode,
        postal: postal,
    }

    const response = await axios.post(SERVER_URL+'user/create', {
        userData: userData,
        addressData: addressData,
    });
    return response.data;
};
