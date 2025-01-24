import {useEffect, useState} from "react";
import {fetchTickets} from "../../services/ticket.service.tsx";
import {Ticket} from "../../types/interfaces.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import { storage } from "../../../App.tsx";
import { ToastAndroid } from "react-native";

export const useTickets = () => {
    const { token } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>();
    const [ticketsLoading, setTicketsLoading] = useState(true);

    const refreshTickets = (token: string) => {
        fetchTickets(token)
            .then(async (data) => {
                setTickets(data);
                if (data)
                    storage.set('tickets', JSON.stringify(data));
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania biletów', ToastAndroid.SHORT);
            })
            .finally(() => {
                setTicketsLoading(false);
            });
    }

    useEffect(() => {
        if (token)
            refreshTickets(token);
    }, []);

    return {
        tickets,
        ticketsLoading,
        refreshTickets,
    };
};
