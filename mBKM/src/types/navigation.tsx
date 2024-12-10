import { NavigationProp as BaseNavigationProp } from '@react-navigation/native';
import {Ticket} from "../repositories/interfaces.tsx";

export type RootStackParamList = {
    Home: undefined;
    Purchase: undefined;
    SelectingPurchaseConfiguration: {
        selectedTicket: Ticket | null;
        ticketType: 'single' | 'season' | null;
        numberSelectedLines: string;
    };
    Profile: { userId: string };
};

export type NavigationProp = BaseNavigationProp<RootStackParamList>;
