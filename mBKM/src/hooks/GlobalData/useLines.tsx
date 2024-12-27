import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Line} from "../../types/interfaces.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {fetchLines} from "../../services/line.service.tsx";
import { storage } from "../../../App.tsx";

export const useLines = () => {
    const { token } = useAuth();
    const [lines, setLines] = useState<Line[]>();
    const [linesLoading, setLinesLoading] = useState(true);

    const refreshLines = (token: string) => {
        fetchLines(token)
            .then(async (data) => {
                setLines(data);
                if (data)
                    // await AsyncStorage.setItem('lines', JSON.stringify(data));
                    storage.set('lines', JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Błąd pobierania linii | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
            })
            .finally(() => {
                setLinesLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshLines(token);
    }, []);

    return {
        lines,
        linesLoading,
        refreshLines,
    };
};
