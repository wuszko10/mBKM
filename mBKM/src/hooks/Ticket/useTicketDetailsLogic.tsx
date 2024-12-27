import { useEffect,useState } from "react";
import { MetadataType,Ticket,TicketOrderTransaction,UserTicket } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { fetchUserTickets,getUserTicket } from "../../services/ticket.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export const useTicketDetailsLogic = (userTicketId: string) => {

    const [isLoading, setIsLoading] = useState(true);

    const { token, userId } = useAuth();
    const [userTicket, setUserTicket] = useState<UserTicket>();
    const [transaction, setTransaction] = useState<TicketOrderTransaction>();
    const [status, setStatus] = useState<MetadataType>()
    const [ticket, setTicket] = useState<Ticket>();

    const getUserTicketData = (token: string) => {

        if(!isLoading) return;


        getUserTicket(userTicketId, token)
            .then(async (data) => {
                setUserTicket(data.userTicket);
                setTransaction(data.transaction);

                const ticketStr = storage.getString('tickets');
                const statusTypesStr = storage.getString('statusTypes')
                if (ticketStr && statusTypesStr) {
                    const parseTickets: Ticket[] = JSON.parse(ticketStr);
                    const filterTicket = parseTickets.find(t => t._id == data.userTicket.ticketId);

                    const parseStatus: MetadataType[] = JSON.parse(statusTypesStr);
                    const filterStatus = parseStatus.find(s => s.id === data.userTicket.statusId )
                    setTicket(filterTicket);
                    setStatus(filterStatus);
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
            getUserTicketData(token);
    }, [isLoading]);

    return {
        userTicket,
        transaction,
        ticket,
        status,
        isLoading,
    };
}
