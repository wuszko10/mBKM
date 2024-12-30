import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addBusStop = async (stopData, token) => {
    try {
        const response = await axios.post(URI + 'stop', {
            name: stopData.name,
            longitude: stopData.longitude,
            latitude: stopData.latitude,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Dodano nowy przystanek', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Przystanek nie został utworzony', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const fetchStops = async (page, pageSize, searchQuery, token) => {

    const params = new URLSearchParams({
        page: page,
        pageSize: pageSize,
        searchQuery: searchQuery,
    });

    const response = await axios.get(URI + `stops/table?${params.toString()}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const editBusStop = async (id, stopData, token) => {
    try {
        const response = await axios.post(URI + 'stop', {
            id: id,
            name: stopData.name,
            longitude: stopData.longitude,
            latitude: stopData.latitude,
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

export const deleteBusStop = async (id, token) => {
    try {
        const response = await axios.delete(URI + `stop/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        toast.success('Przystanek został usunięty', {
            position: 'top-right',
            theme: "colored",
        });
        return response.data;
    } catch (err) {
        toast.error('Przystanek nie został usunięty', {
            position: 'top-right',
            theme: "colored",
        });
    }
};
