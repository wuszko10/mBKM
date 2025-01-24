import {useEffect, useState} from "react";
import { Relief } from "../../types/interfaces.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import { fetchReliefs } from "../../services/relief.service.tsx";
import { storage } from "../../../App.tsx";
import { ToastAndroid } from "react-native";

export const useReliefs = () => {
    const { token } = useAuth();
    const [reliefs, setReliefs] = useState<Relief[]>();
    const [reliefsLoading, setReliefsLoading] = useState(true);

    const refreshReliefs = (token: string) => {
        fetchReliefs(token)
            .then((data) => {
                setReliefs(data);
                if (data)
                    storage.set('reliefs', JSON.stringify(data));
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania ulg', ToastAndroid.SHORT);
            })
            .finally(() => {
                setReliefsLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshReliefs(token);
    }, []);

    return {
        reliefs,
        reliefsLoading,
        refreshReliefs,
    };
};
