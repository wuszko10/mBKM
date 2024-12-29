import { useEffect,useState } from "react";
import { Relief,Ticket,UserTicket } from "../../types/interfaces.tsx";
import { fetchUserTicketToValidate,fetchUserTicketValidated } from "../../services/ticket.service.tsx";
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
    const [toValidateTicketsTMP, setToValidateTicketsTMP] = useState<UserTicket[]>();
    const [validateTickets, setValidateTickets] = useState<UserTicket[]>();
    const [reliefs, setReliefs] = useState<Relief[]>();
    const [tickets, setTickets] = useState<Ticket[]>();

    function handleTicketDetails(id: string) {
        navigation.navigate('TicketDetails', {userTicketId: id});
    }

    function handleValidateTicket(id: string) {
        navigation.navigate("ValidateTicket", {userTicketId: id})
    }

    const getUserTickets = async (token: string) => {

        if(!isLoading) return;

        checkInternetConnection();

        const ticketStr = storage.getString('tickets');
        const reliefTypesStr = storage.getString('reliefs');
        if (ticketStr && reliefTypesStr) {
            setTickets(JSON.parse(ticketStr));
            setReliefs(JSON.parse(reliefTypesStr));
        }

        fetchUserTicketToValidate(userId, token)
            .then(async (data) => {
                if(data && data.length > 0) {
                    setToValidateTicketsTMP(data);
                }
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania danych', ToastAndroid.SHORT);
            })

        fetchUserTicketValidated(userId, token)
            .then(async (data) => {
                if(data && data.length > 0) {
                    setActiveTickets(true);
                    setValidateTickets(data);
                }
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania danych', ToastAndroid.SHORT);
            })

        setIsLoading(false);
    }

    useEffect(() => {
        if(token && userId) {

            getUserTickets(token);

            if (!isLoading) {
                const filteredTickets = toValidateTicketsTMP && toValidateTicketsTMP.filter((item) => {
                    const ticketType = tickets && tickets.find(type => type._id === item.ticketId);
                    return ticketType?.type === "674dd1b74e3d87c99c967256";
                });

                if (filteredTickets && filteredTickets?.length>0) {
                    setForValidation(true);
                    setToValidateTickets(filteredTickets);
                } else {
                    setForValidation(false);
                }
            }
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
        handleTicketDetails,
        handleValidateTicket,
        isLoading,
    }
}
