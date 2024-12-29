import {useEffect, useState} from "react";
import {fetchStops} from "../../services/busStop.service.tsx";
import {BusStop} from "../../types/interfaces.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import { storage } from "../../../App.tsx";
import { ToastAndroid } from "react-native";

export const useStops = () => {
    const { token } = useAuth();
    const [stops, setStops] = useState<BusStop[]>();
    const [stopsLoading, setStopsLoading] = useState(true);

    const refreshStops = (token: string) => {
        fetchStops(token)
            .then(async (data) => {
                setStops(data);
                if (data)
                    storage.set('stops', JSON.stringify(data));
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania przystanków', ToastAndroid.SHORT);
            })
            .finally(() => {
                setStopsLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshStops(token);
    }, []);

    return {
        stops,
        stopsLoading,
        refreshStops,
    };
};
