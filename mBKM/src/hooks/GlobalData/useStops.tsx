import {useEffect, useState} from "react";
import {fetchStops} from "../../services/busStop.service.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BusStop} from "../../types/interfaces.tsx";
import {useAuth} from "../../components/Global/AuthContext.tsx";
import { storage } from "../../../App.tsx";

export const useStops = () => {
    const { token } = useAuth();
    const [stops, setStops] = useState<BusStop[]>();
    const [stopsLoading, setStopsLoading] = useState(true);

    const refreshStops = () => {
        fetchStops()
            .then(async (data) => {
                setStops(data);
                if (data)
                    // await AsyncStorage.setItem('stops', JSON.stringify(data));
                    storage.set('stops', JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Błąd pobierania przystanków | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
            })
            .finally(() => {
                setStopsLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshStops();
    }, []);

    return {
        stops,
        stopsLoading,
        refreshStops,
    };
};
