import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Relief } from "../../types/interfaces.tsx";
import {useAuth} from "../../components/Global/AuthContext.tsx";
import { fetchReliefs } from "../../services/relief.service.tsx";
import { storage } from "../../../App.tsx";

export const useReliefs = () => {
    const { token } = useAuth();
    const [reliefs, setReliefs] = useState<Relief[]>();
    const [reliefsLoading, setReliefsLoading] = useState(true);

    const refreshReliefs = () => {
        fetchReliefs()
            .then((data) => {
                setReliefs(data);
                if (data)
                    // await AsyncStorage.setItem('reliefs', JSON.stringify(data));
                    storage.set('reliefs', JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Błąd pobierania ulg | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
            })
            .finally(() => {
                setReliefsLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshReliefs();
    }, []);

    return {
        reliefs,
        reliefsLoading,
        refreshReliefs,
    };
};
