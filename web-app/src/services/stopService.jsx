import axios from 'axios';
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const addBusStop = async (stopData) => {
    try {
        const token = localStorage.getItem('token');
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

export const fetchStops = async (page, pageSize, searchQuery) => {
    const token = localStorage.getItem('token');

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
