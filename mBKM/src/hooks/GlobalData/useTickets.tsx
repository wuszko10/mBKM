import {useEffect, useState} from "react";
import {fetchStops} from "../../services/busStop.service.tsx";
import {fetchTickets} from "../../services/ticket.service.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ticket} from "../../types/interfaces.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import { storage } from "../../../App.tsx";

export const useTickets = () => {
    const { token } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>();
    const [ticketsLoading, setTicketsLoading] = useState(true);

    const refreshTickets = (token: string) => {
        fetchTickets(token)
            .then(async (data) => {
                setTickets(data);
                if (data)
                    // await AsyncStorage.setItem('tickets', JSON.stringify(data));
                    storage.set('tickets', JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Błąd pobierania biletów | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
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
