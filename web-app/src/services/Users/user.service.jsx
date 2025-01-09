import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addUser = async (userData, token) => {
    try {
        const response = await axios.post(URI + 'user/create', {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            pesel: userData.pesel,
            registrationDate: new Date(Date.now()).toISOString(),
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Dodano nowego użytkownika', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Użytkownik nie został utworzony', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const editUser = async (id, userData, token) => {
    try {
        const response = await axios.post(URI + 'user/create', {
            id: id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            pesel: userData.pesel,
            registrationDate: userData.registrationDate,
            role: userData.role,
            active: userData.active,
            isAdmin: userData.isAdmin,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Dokonano aktualizacji użytkownika', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Błąd przy aktualizacji', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const getUser = async (id, token) => {

    const params = new URLSearchParams({
        id: id
    });

    const response = await axios.get(URI+`user/?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const fetchUsers = async (page, pageSize, searchQuery, token) => {

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        searchQuery: searchQuery,
    });

    const response = await axios.get(URI + `users?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const userLogout = async (userId, token) => {

    const response = await axios.delete(URI+`user/logout/?${userId}?${token}`);
    return response.data;
};

export const userLogin = async (username, password) => {

    const response = await axios.post(URI+'user/auth', {
        email: username,
        password: password
    });
    return response.data;
};


export const deactivateUser = async (id, token) => {

    const response = await axios.post(URI+'user/deactivate', {
        id: id,
    }, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
