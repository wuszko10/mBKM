import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addRelief = async (reliefData, token) => {
    try {
        const response = await axios.post(URI + 'relief', {
            name: reliefData.name,
            type: reliefData.type,
            ticketType: reliefData.ticketType,
            percentage: reliefData.percentage,
            isActive: reliefData.isActive,
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
        toast.error('Ulga nie została utworzona', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const fetchReliefs = async (page, pageSize, searchQuery, token) => {

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

export const editRelief = async (id, reliefData, token) => {
    try {
        const response = await axios.post(URI + 'relief', {
            id: id,
            name: reliefData.name,
            type: reliefData.type,
            ticketType: reliefData.ticketType,
            percentage: reliefData.percentage,
            isActive: reliefData.isActive,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Zaktualizowano ulgę', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Ulga nie została zaktualizowana', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const deleteRelief = async (id, token) => {
    try {
        const response = await axios.delete(URI + `relief/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Ulga została usunięta', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 405) {
            toast.error('Ulga nie może zostać usunięta, ponieważ jest używana', {
                position: 'top-right',
                theme: "colored",
            });
        } else {
            toast.error('Ulga nie została usunięta', {
                position: 'top-right',
                theme: "colored",
            });
        }
    }
};
