import {useEffect, useState} from "react";
import {fetchMetadata} from "../../services/metadata.service.tsx";
import {Metadata} from "../../types/interfaces.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import { storage } from "../../../App.tsx";
import { ToastAndroid } from "react-native";

export const useMetadata = () => {
    const { token } = useAuth();
    const [metadata, setMetadata] = useState<Metadata>();
    const [metadataLoading, setMetadataLoading] = useState(true);

    const refreshMetadata = (token: string) => {
        fetchMetadata(token)
            .then((data) => {
                setMetadata(data);
                if (data) {
                    storage.set("ticketTypes",JSON.stringify(data.ticketTypes));
                    storage.set("ticketPeriods",JSON.stringify(data.ticketPeriods));
                    storage.set("ticketLines",JSON.stringify(data.ticketLines));
                    storage.set("reliefTypes",JSON.stringify(data.reliefTypes));
                    storage.set('paymentMethods', JSON.stringify(data.paymentMethods));
                    storage.set('statusTypes', JSON.stringify(data.statusTypes));
                }
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania metadanych', ToastAndroid.SHORT);
            })
            .finally(() => {
                setMetadataLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshMetadata(token);
    }, []);

    return {
        metadata,
        metadataLoading,
        refreshMetadata,
    };
};
