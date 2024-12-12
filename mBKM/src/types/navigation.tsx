import { NavigationProp as BaseNavigationProp } from '@react-navigation/native';
import { Relief,Ticket,TicketOrderTransaction } from "./interfaces.tsx";
import BuyTicketSummary from "../screens/BuyTicket/BuyTicketSummary/BuyTicketSummary.tsx";

export type RootStackParamList = {
    Home: undefined;
    Tickets: undefined;
    TicketDetails: {selectedTransaction: TicketOrderTransaction};
    BuyTicketSelection: undefined;
    BuyTicketConfiguration: {
        selectedTicket: Ticket | null;
    };
    BuyTicketSummary: {
        selectedTicket: Ticket,
        selectedLines: string | null,
        selectedRelief: Relief | undefined,
        finalPrice: number,
        selectedDate?: string,
    };
    Profile: { userId: string };
};

export type NavigationProp = BaseNavigationProp<RootStackParamList>;
