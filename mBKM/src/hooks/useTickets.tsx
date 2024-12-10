import {useEffect, useState} from "react";
import {fetchStops} from "../services/busStops.service.tsx";
import {fetchTickets} from "../services/ticket.service.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ticket} from "../interfaces/interfaces.tsx";

export const useTickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>();
    const [ticketsLoading, setTicketsLoading] = useState(true);

    const refreshTickets = () => {
        fetchTickets()
            .then(async (data) => {
                setTickets(data);
                if (data)
                    await AsyncStorage.setItem('tickets', JSON.stringify(data));
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
        refreshTickets();
    }, []);

    return {
        tickets,
        ticketsLoading,
        refreshTickets,
    };
};
