import { NavigationProp as BaseNavigationProp } from '@react-navigation/native';
import {Ticket, TicketOrderTransaction} from "./interfaces.tsx";

export type RootStackParamList = {
    Home: undefined;
    Tickets: undefined;
    TicketDetails: {selectedTransaction: TicketOrderTransaction};
    TicketSelection: undefined;
    TicketConfiguration: {
        selectedTicket: Ticket | null;
        ticketType: 'single' | 'season' | null;
        numberSelectedLines: string;
    };
    TicketSummary: {
        selectedTicket: Ticket,
        selectedLines?: string,
        selectedRelief: string,
        selectedDate?: string,
        finalPrice: number
    };
    Profile: { userId: string };
};

export type NavigationProp = BaseNavigationProp<RootStackParamList>;
