import { useEffect,useState } from "react";
import { Line,MetadataType,Relief,Ticket,UserTicket } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { fetchUserTickets } from "../../services/ticket.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import checkInternetConnection from "../../utils/network.tsx";
import { ToastAndroid } from "react-native";

export const useTicketLogic = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>();

    const { token, userId } = useAuth();
    const [userTickets, setUserTickets] = useState<UserTicket[]>();
    const [tickets, setTickets] = useState<Ticket[]>();
    const [statusTypes, setStatusTypes] = useState<MetadataType[]>()
    const [reliefs, setReliefs] = useState<Relief[]>()
    const [lines, setLines] = useState<Line[]>();

    const getUserTickets = (token: string) => {

        if(!isLoading) return;

        checkInternetConnection().then();

        fetchUserTickets(userId, token)
            .then(async (data) => {
                setUserTickets(data);
                const ticketStr = storage.getString('tickets');
                const statusTypesStr = storage.getString('statusTypes');
                const reliefTypesStr = storage.getString('reliefs');
                const linesStr = storage.getString('lines');
                if (ticketStr && statusTypesStr && reliefTypesStr && linesStr) {
                    setTickets(JSON.parse(ticketStr));
                    setStatusTypes(JSON.parse(statusTypesStr));
                    setReliefs(JSON.parse(reliefTypesStr));
                    setLines(JSON.parse(linesStr));
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
            getUserTickets(token);
    }, [isLoading]);


    function handleTicketDetails(item: UserTicket) {
        navigation.navigate('TicketDetails', {userTicketId: item.id});
    }

    return {
        userTickets,
        tickets,
        statusTypes,
        reliefs,
        lines,
        isLoading,
        handleTicketDetails,
    };
}
