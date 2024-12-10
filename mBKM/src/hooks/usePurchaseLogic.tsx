import {useState} from "react";
import {Ticket} from "../repositories/interfaces.tsx";

export const usePurchaseLogic = () => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
    const [ticketType, setTicketType] = useState<'single' | 'season' | null>(null);
    const [numberSelectedLines, setNumberSelectedLines] = useState("");

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
        resetData,
    };
}
