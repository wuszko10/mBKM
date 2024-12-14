import {useEffect, useState} from "react";
import {fetchTickets} from "../../services/ticket.service.tsx";;
import {Ticket} from "../../types/interfaces.tsx";
import {useAuth} from "../../components/Global/AuthContext.tsx";
import { storage } from "../../../App.tsx";

export const useTransaction = () => {
    const { token } = useAuth();

    const [tickets, setTickets] = useState<Ticket[]>();
    const [ticketsLoading, setTicketsLoading] = useState(true);

    const refreshTickets = () => {
        fetchTickets()
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
            refreshTickets();
    }, []);

    return {
        tickets,
        ticketsLoading,
        refreshTickets,
    };
};
