import axios from "axios";

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
        console.error('Error fetching data:', error);
    }
};
