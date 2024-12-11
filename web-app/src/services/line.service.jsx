import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addLine = async (lineData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(URI + 'line', {
            number: lineData.number,
            name: lineData.name || lineData.number,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Dodano nową linię', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Linia nie została utworzona', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const fetchLines = async (page, pageSize, searchQuery) => {
    const token = localStorage.getItem('token');

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        searchQuery: searchQuery,
    });

    const response = await axios.get(URI + `lines/table?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const editLine = async (id, lineData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(URI + 'line', {
            id: id,
            number: lineData.number,
            name: lineData.name || lineData.number,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Zaktualizowano przystanek', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Przystanek nie został zaktualizowany', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const deleteLine = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(URI + `line/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Linia została usunięta', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Linia nie została usunięta', {
            position: 'top-right',
            theme: "colored",
        });
    }
};
