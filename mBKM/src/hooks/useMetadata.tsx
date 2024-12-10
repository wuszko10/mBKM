import {useEffect, useState} from "react";
import {fetchMetadata} from "../services/metadata.service.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Metadata} from "../interfaces/interfaces.tsx";

export const useMetadata = () => {
    const [metadata, setMetadata] = useState<Metadata>();
    const [metadataLoading, setMetadataLoading] = useState(true);

    const refreshMetadata = () => {
        fetchMetadata()
            .then(async (data) => {
                setMetadata(data);
                if (data)
                    await AsyncStorage.setItem('metadata', JSON.stringify(data));
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
        refreshMetadata();
    }, []);

    return {
        metadata,
        metadataLoading,
        refreshMetadata,
    };
};
