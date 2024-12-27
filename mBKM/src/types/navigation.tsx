import { NavigationProp as BaseNavigationProp } from '@react-navigation/native';
import { Relief,Ticket,TicketOrderTransaction } from "./interfaces.tsx";
import BuyTicketSummary from "../screens/BuyTicket/BuyTicketSummary/BuyTicketSummary.tsx";

export type RootStackParamList = {

    Login: undefined;
    Register: undefined;
    Welcome: undefined;
    TicketDetails: {
        userTicketId: string,
    };
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
    PaymentScreen: {
        transactionId: string,
        transactionNumber: string,
        paymentMethodId: string,
        transactionAmount: number,
        userTicketId?: string,
    };
    Profile: undefined;
    ValidateTicket: {
        userTicketId: string,
        walletTransaction?: boolean
    };
    UserPanel: { screen: 'Home' | 'Tickets' | 'Wallet' } | undefined;
    TopUpScreen: undefined;
};

export type NavigationProp = BaseNavigationProp<RootStackParamList>;
