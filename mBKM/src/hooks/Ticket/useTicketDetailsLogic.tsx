import { useEffect,useState } from "react";
import {
    Line,
    MetadataType,
    PaymentMethod,
    Relief,
    Ticket,
    TicketOrderTransaction,
    UserTicket
} from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { getUserTicket } from "../../services/ticket.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";

export const useTicketDetailsLogic = (userTicketId: string) => {

    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation<NavigationProp>();
    const { token } = useAuth();

    const [userTicket, setUserTicket] = useState<UserTicket>();
    const [transaction, setTransaction] = useState<TicketOrderTransaction>();
    const [status, setStatus] = useState<MetadataType>()
    const [method, setMethod] = useState<PaymentMethod>()
    const [ticket, setTicket] = useState<Ticket>();
    const [relief, setRelief] = useState<Relief>();
    const [line, setLine] = useState<Line>();

    const getUserTicketData = (token: string) => {

        if(!isLoading) return;


        getUserTicket(userTicketId, token)
            .then(async (data) => {
                setUserTicket(data.userTicket);
                setTransaction(data.transaction);

                const ticketStr = storage.getString('tickets');
                const statusTypesStr = storage.getString('statusTypes');
                const methodStr = storage.getString('paymentMethods');
                const reliefTypesStr = storage.getString('reliefs');
                const linesStr = storage.getString('lines');
                if (ticketStr && statusTypesStr && methodStr && reliefTypesStr && linesStr) {
                    const parseTickets: Ticket[] = JSON.parse(ticketStr);
                    const filterTicket = parseTickets.find(t => t._id == data.userTicket.ticketId);

                    const parseStatus: MetadataType[] = JSON.parse(statusTypesStr);
                    const filterStatus = parseStatus.find(s => s.id === data.userTicket.statusId);

                    const parseMethod: PaymentMethod[] = JSON.parse(methodStr);
                    const filterMethod = parseMethod.find(m => m.id === data.transaction.methodId);

                    const parseRelief: Relief[] = JSON.parse(reliefTypesStr);
                    const filterRelief = parseRelief.find(r => r._id === data.userTicket.reliefId);

                    const parseLine: Line[] = JSON.parse(linesStr);
                    const filterLine = parseLine.find(l => l.id === data.userTicket.lineId);

                    setTicket(filterTicket);
                    setStatus(filterStatus);
                    setMethod(filterMethod);
                    setRelief(filterRelief);
                    setLine(filterLine);
                }
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania danych', ToastAndroid.SHORT);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if(token)
            getUserTicketData(token);
    }, [isLoading]);

    const handleValidateTicket = () => {
        if (userTicket)
            navigation.navigate("ValidateTicket", {
                userTicketId: userTicket.id,
            })
    }

    return {
        userTicket,
        transaction,
        ticket,
        status,
        method,
        relief,
        line,
        isLoading,
        handleValidateTicket,
    };
}
