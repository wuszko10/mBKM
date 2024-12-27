import {useEffect, useState} from "react";
import {Ticket} from "../../types/interfaces.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../../../App.tsx";

export const useBuyTicketSelectionLogic = () => {

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
        getTickets();
    }, []);

    function resetData() {
        setSelectedTicketId(null);
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
        ticketsData,
        resetData,
    };
}
