import {useEffect, useState} from "react";
import {Ticket} from "../interfaces/interfaces.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePurchaseLogic = () => {

    const [ticketsData, setTicketsData] = useState<Ticket[] | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const [ticketType, setTicketType] = useState<'single' | 'season' | null>(null);
    const [numberSelectedLines, setNumberSelectedLines] = useState("");


    const getTickets = async () => {
        let ticketStr = await AsyncStorage.getItem('tickets');
        console.log(ticketStr);
        if (ticketStr !== null) {
            setTicketsData(JSON.parse(ticketStr));
        }
    }

    useEffect(() => {
        getTickets();
    }, []);

    function resetData() {
        setSelectedTicketId(null);
        setNumberSelectedLines("");
    }

    function toggleTicketType(type: 'single' | 'season') {
        setTicketType(prev => (prev === type ? null : type));
        resetData();
    }

    return {
        selectedTicket,
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        ticketType,
        toggleTicketType,
        numberSelectedLines,
        setNumberSelectedLines,
        ticketsData,
        resetData,
    };
}
