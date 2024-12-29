import { useEffect,useState } from "react";
import { Relief,Ticket,UserTicket } from "../../types/interfaces.tsx";
import { fetchUserTickets,fetchUserTicketToValidate,fetchUserTicketValidated } from "../../services/ticket.service.tsx";
import { storage } from "../../../App.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";

export const useHomeLogic = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { token, userId } = useAuth();
    const navigation = useNavigation<NavigationProp>();

    const [forValidation, setForValidation] = useState(false);
    const [activeTickets, setActiveTickets] = useState(false);
    const [toValidateTickets, setToValidateTickets] = useState<UserTicket[]>();
    const [validateTickets, setValidateTickets] = useState<UserTicket[]>();
    const [reliefs, setReliefs] = useState<Relief[]>();
    const [tickets, setTickets] = useState<Ticket[]>();

    function handleTicketDetails(id: string) {
        navigation.navigate('TicketDetails', {userTicketId: id});
    }

    function handleValidateTicket(id: string) {
        navigation.navigate("ValidateTicket", {userTicketId: id})
    }

    const getUserTickets = (token: string) => {

        if(!isLoading) return;

        const ticketStr = storage.getString('tickets');
        const reliefTypesStr = storage.getString('reliefs');
        if (ticketStr && reliefTypesStr) {
            setTickets(JSON.parse(ticketStr));
            setReliefs(JSON.parse(reliefTypesStr));
        }

        fetchUserTicketToValidate(userId, token)
            .then(async (data) => {
                if(data && data.length > 0) {
                    setForValidation(true);
                    setToValidateTickets(data);
                }
            })
            .catch((error) => {
                console.error("Błąd pobierania danych | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
            })

        fetchUserTicketValidated(userId, token)
            .then(async (data) => {
                if(data && data.length > 0) {
                    setActiveTickets(true);
                    setValidateTickets(data);
                }
            })
            .catch((error) => {
                console.error("Błąd pobierania danych | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
            })
        setIsLoading(false);
    }

    useEffect(() => {
        if(token)
            getUserTickets(token);
    }, [isLoading]);

    return {
        forValidation,
        activeTickets,
        setActiveTickets,
        toValidateTickets,
        validateTickets,
        reliefs,
        tickets,
        handleTicketDetails,
        handleValidateTicket,
        isLoading,
    }
}
