import { NavigationProp as BaseNavigationProp } from '@react-navigation/native';
import { Line,Relief,Ticket } from "./interfaces.tsx";

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
        selectedLines: Line | undefined,
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
    ResetPassword: undefined;
};

export type NavigationProp = BaseNavigationProp<RootStackParamList>;
