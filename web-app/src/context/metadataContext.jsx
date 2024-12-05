import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
    const [metadata, setMetadata] = useState({
        ticketTypes: [],
        ticketPeriods: [],
        ticketLines: [],
        reliefTypes: [],
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const URI = process.env.REACT_APP_API_URL;


        const fetchMetadata = async () => {

            try {
                const response = await axios.get(URI + 'metadata', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setMetadata(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }


        };

        fetchMetadata();

    }, [token]);

    return (
        <MetadataContext.Provider value={{metadata, setMetadata}}>
            {children}
        </MetadataContext.Provider>
    );
};

export const useMetadata = () => {
    const context = useContext(MetadataContext);
    if (!context) {
        throw new Error('useMetadata must be used within a MetadataProvider');
    }
    return context;
};
