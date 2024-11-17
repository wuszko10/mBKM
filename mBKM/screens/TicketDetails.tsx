import React from 'react';
import { SafeAreaView,Text } from "react-native";
import { Ticket,TicketsPurchased } from "../repositories/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation,useRoute } from "@react-navigation/native";

type RootStackParamList = {
    TicketDetails: {selectedTicket: Ticket};
    Home: undefined;
    Tickets: undefined;
};

type RouteParams = {
    selectedTicket: TicketsPurchased;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'TicketDetails'>;
const TicketDetails = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {selectedTicket} = route.params as RouteParams;

    return (
        <SafeAreaView>
            <Text>Numer biletu: {selectedTicket.number}</Text>
            <Text>Cena: {selectedTicket.finalPrice.toFixed(2)} zł</Text>
            <Text>Data zakupu: {new Date(selectedTicket.purchaseDate).toLocaleString()}</Text>
        </SafeAreaView>
    )
};

export default TicketDetails;
