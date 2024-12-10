import React, {SetStateAction} from "react";
import {Ticket} from "../repositories/interfaces.tsx";

export type TicketSelectorProps = {
    ticketType: 'single' | 'season' | null;
    toggleTicketType: (type: 'single' | 'season') => void;
}

export type TicketAndReliefTypeSelectorProps = {
    setSelectedTicket: React.Dispatch<SetStateAction<Ticket | null>>;
    selectedTicketId: number | null;
    setSelectedTicketId: React.Dispatch<React.SetStateAction<number | null>>;
    ticketType: 'single' | 'season' | null;
    setNumberSelectedLines: React.Dispatch<React.SetStateAction<string>>;
};
