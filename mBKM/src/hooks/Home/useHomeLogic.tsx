import { useEffect,useState } from "react";
import { Line,Relief,Ticket,UserTicket } from "../../types/interfaces.tsx";
import {
    fetchDashboardUserTicket
} from "../../services/ticket.service.tsx";
import { storage } from "../../../App.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { ToastAndroid } from "react-native";
import checkInternetConnection from "../../utils/network.tsx";
export const useHomeLogic = (token: string | null, userId: string) => {

    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>();

    const [forValidation, setForValidation] = useState(false);
    const [activeTickets, setActiveTickets] = useState(false);
    const [toValidateTickets, setToValidateTickets] = useState<UserTicket[]>();
    const [validateTickets, setValidateTickets] = useState<UserTicket[]>();
    const [reliefs, setReliefs] = useState<Relief[]>();
    const [tickets, setTickets] = useState<Ticket[]>();
    const [lines, setLines] = useState<Line[]>();

    function handleTicketDetails(id: string) {
        navigation.navigate('TicketDetails', {userTicketId: id});
    }

    function handleValidateTicket(id: string) {
        navigation.navigate("ValidateTicket", {userTicketId: id})
    }

    const getUserTickets = async (token: string) => {

        if(!isLoading) return;

        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            return;
        }

        const ticketStr = storage.getString('tickets');
        const reliefTypesStr = storage.getString('reliefs');
        const linesStr = storage.getString('lines');
        if (ticketStr && reliefTypesStr && linesStr) {
            setTickets(JSON.parse(ticketStr));
            setReliefs(JSON.parse(reliefTypesStr));
            setLines(JSON.parse(linesStr));
        }

        fetchDashboardUserTicket(userId, token)
            .then(async (data) => {
                if(data) {
                    if (data.active.length > 0){
                        setValidateTickets(data.active);
                        setActiveTickets(true);
                    }

                    if (data.toValidate.length>0) {
                        setToValidateTickets(data.toValidate);
                        setForValidation(true);
                    }

                }
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania danych', ToastAndroid.SHORT);
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    useEffect(() => {
        if(token && userId) {
            getUserTickets(token).then();
        }
    }, [isLoading]);

    return {
        forValidation,
        activeTickets,
        setActiveTickets,
        setForValidation,
        toValidateTickets,
        validateTickets,
        reliefs,
        tickets,
        lines,
        handleTicketDetails,
        handleValidateTicket,
        isLoading,
    }
}
