import { useEffect,useState } from "react";
import { MetadataType,Relief,Ticket,UserTicket } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { fetchUserTickets } from "../../services/ticket.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export const useTicketLogic = () => {

    const [isLoading, setIsLoading] = useState(true);

    const { token, userId } = useAuth();
    const [userTickets, setUserTickets] = useState<UserTicket[]>();
    const [tickets, setTickets] = useState<Ticket[]>();
    const [statusTypes, setStatusTypes] = useState<MetadataType[]>()
    const [reliefs, setReliefs] = useState<Relief[]>()

    const getUserTickets = (token: string) => {

        if(!isLoading) return;


        fetchUserTickets(userId, token)
            .then(async (data) => {
                setUserTickets(data);
                const ticketStr = storage.getString('tickets');
                const statusTypesStr = storage.getString('statusTypes');
                const reliefTypesStr = storage.getString('reliefs');
                if (ticketStr && statusTypesStr && reliefTypesStr) {
                    setTickets(JSON.parse(ticketStr));
                    setStatusTypes(JSON.parse(statusTypesStr));
                    setReliefs(JSON.parse(reliefTypesStr));
                }
            })
            .catch((error) => {
                console.error("Błąd pobierania danych | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if(token)
            getUserTickets(token);
    }, [isLoading]);

    return {
        userTickets,
        tickets,
        statusTypes,
        reliefs,
        isLoading,
    };
}
