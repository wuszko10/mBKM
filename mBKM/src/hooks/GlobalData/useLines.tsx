import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Line} from "../../types/interfaces.tsx";
import {useAuth} from "../../components/Global/AuthContext.tsx";
import {fetchLines} from "../../services/Lines.service.tsx";

export const useLines = () => {
    const { token } = useAuth();
    const [lines, setLines] = useState<Line[]>();
    const [linesLoading, setLinesLoading] = useState(true);

    const refreshLines = () => {
        fetchLines()
            .then(async (data) => {
                setLines(data);
                if (data)
                    await AsyncStorage.setItem('lines', JSON.stringify(data));
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
            refreshLines();
    }, []);

    return {
        lines,
        linesLoading,
        refreshLines,
    };
};
