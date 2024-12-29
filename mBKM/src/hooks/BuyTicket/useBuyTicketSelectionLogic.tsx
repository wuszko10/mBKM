import {useEffect, useState} from "react";
import {Ticket} from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { ToastAndroid } from "react-native";

export const useBuyTicketSelectionLogic = () => {

    const navigation = useNavigation<NavigationProp>();
    const [ticketsData, setTicketsData] = useState<Ticket[] | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [ticketType, setTicketType] = useState<'single' | 'season' | null>(null);

    const getTickets = async () => {
        let ticketStr = storage.getString('tickets');
        if (ticketStr) {
            setTicketsData(JSON.parse(ticketStr));
        }
    }

    useEffect(() => {
        getTickets().then();
    }, []);

    function resetData() {
        setSelectedTicketId(null);
    }

    function toggleTicketType(type: 'single' | 'season') {
        setTicketType(prev => (prev === type ? null : type));
        resetData();
    }

    const handleConfiguration= () => {
        if (selectedTicket !== null && selectedTicketId !== null) {
            navigation.navigate('BuyTicketConfiguration', {
                selectedTicket: selectedTicket
            });
            resetData();
        } else {
            ToastAndroid.show('Uzupełnij wszystkie pola', ToastAndroid.SHORT);
        }
    }


    return {
        selectedTicket,
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        ticketType,
        toggleTicketType,
        ticketsData,
        handleConfiguration,
    };
}
