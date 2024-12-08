import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addRelief = async (reliefData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(URI + 'relief', {
            name: reliefData.name,
            type: reliefData.type,
            percentage: reliefData.percentage,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Dodano nową ulgę', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Ulga nie został utworzony', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const fetchReliefs = async (page, pageSize, searchQuery) => {
    const token = localStorage.getItem('token');

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        searchQuery: searchQuery,
    });

    const response = await axios.get(URI + `reliefs/table?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
