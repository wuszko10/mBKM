import {useEffect, useState} from "react";
import {fetchMetadata} from "../../services/metadata.service.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Metadata} from "../../types/interfaces.tsx";
import {useAuth} from "../../components/Global/AuthContext.tsx";
import { storage } from "../../../App.tsx";

export const useMetadata = () => {
    const { token } = useAuth();
    const [metadata, setMetadata] = useState<Metadata>();
    const [metadataLoading, setMetadataLoading] = useState(true);

    const refreshMetadata = () => {
        fetchMetadata()
            .then((data) => {
                setMetadata(data);
                if (data)
                    // await AsyncStorage.setItem('ticketTypes', JSON.stringify(data.ticketTypes));
                    // await AsyncStorage.setItem('ticketPeriods', JSON.stringify(data.ticketPeriods));
                    // await AsyncStorage.setItem('ticketLines', JSON.stringify(data.ticketLines));
                    // await AsyncStorage.setItem('reliefTypes', JSON.stringify(data.reliefTypes));
                    storage.set('ticketTypes', JSON.stringify(data.ticketTypes));
                    storage.set('ticketPeriods', JSON.stringify(data.ticketPeriods));
                    storage.set('ticketLines', JSON.stringify(data.ticketLines));
                    storage.set('reliefTypes', JSON.stringify(data.reliefTypes));
                    storage.set('paymentMethods', JSON.stringify(data.paymentMethods));
            })
            .catch((error) => {
                console.error("Błąd pobierania metadanych | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
            })
            .finally(() => {
                setMetadataLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshMetadata();
    }, []);

    return {
        metadata,
        metadataLoading,
        refreshMetadata,
    };
};
