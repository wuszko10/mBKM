import axios from "axios";
import {toast} from "react-toastify";

const URI = process.env.REACT_APP_API_URL;
export const fetchMetadata = async (token) => {

    try {
        const response = await axios.get(URI + 'metadata', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        localStorage.setItem('metadata', JSON.stringify(response.data));
    } catch (error) {
        toast.error('Błąd pobierania danych', {
            position: 'top-right',
            theme: "colored",
        });
    }
};

export const fetchDashboard = async (days, token) => {
    try {
        const response = await axios.get(URI + `admin/dashboard/${days.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.data;
    } catch {
        toast.error('Błąd pobierania danych', {
            position: 'top-right',
            theme: "colored",
        });
    }
}
