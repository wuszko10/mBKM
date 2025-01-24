import {useEffect, useState} from "react";
import {Line} from "../../types/interfaces.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {fetchLines} from "../../services/line.service.tsx";
import { storage } from "../../../App.tsx";
import { ToastAndroid } from "react-native";

export const useLines = () => {
    const { token } = useAuth();
    const [lines, setLines] = useState<Line[]>();
    const [linesLoading, setLinesLoading] = useState(true);

    const refreshLines = (token: string) => {
        fetchLines(token)
            .then(async (data) => {
                setLines(data);
                if (data)
                    storage.set('lines', JSON.stringify(data));
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania linii', ToastAndroid.SHORT);
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
