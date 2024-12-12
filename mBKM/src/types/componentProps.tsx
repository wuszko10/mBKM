import React, {SetStateAction} from "react";
import {Ticket} from "./interfaces.tsx";

export type TicketSelectorProps = {
    ticketType: 'single' | 'season' | null;
    toggleTicketType: (type: 'single' | 'season') => void;
}

export type TicketAndReliefTypeSelectorProps = {
    ticketsData: Ticket[];
    setSelectedTicket: React.Dispatch<SetStateAction<Ticket | null>>;
    selectedTicketId: string | null;
    setSelectedTicketId: React.Dispatch<React.SetStateAction<string | null>>;
    ticketType: 'single' | 'season' | null;
};
