import axios from 'axios';

const URI = process.env.REACT_APP_API_URL;

export const fetchTransactions = async (page, pageSize, searchQuery, token) => {

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        searchQuery: searchQuery,
    });

    const response = await axios.get(URI + `transactions?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const fetchTopUps = async (page, pageSize, searchQuery, token) => {

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        searchQuery: searchQuery,
    });

    const response = await axios.get(URI + `top-ups?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const getTransaction = async (id, token) => {

    const params = new URLSearchParams({
        id: id,
    });

    const response = await axios.get(URI + `transaction?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
