import React from 'react';
import { Text,TouchableOpacity,View } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ticket } from "../repositories/interfaces.tsx";
import { discounts } from "../repositories/Data.tsx";

type RootStackParamList = {
    Purchase: undefined;
    SummaryPurchaseScreen: {selectedTicket: Ticket, selectedDiscount: string, finalPrice: number};
    Home: undefined;
    Tickets: undefined;
};

type RouteParams = {
    selectedTicket: Ticket;
    selectedDiscount: string;
    finalPrice: number;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'SummaryPurchaseScreen'>;
const SummaryPurchaseScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {selectedTicket, selectedDiscount, finalPrice} = route.params as RouteParams;
    const currentDate = new Date();

    const selectedDiscountObj = discounts.find(discount => discount._id === selectedDiscount);

    return (
        <View>
            <Text>Podsumowanie zamówienia</Text>

            <View>
                <Text>{selectedTicket.type}</Text>
                <Text>{selectedTicket.lines}</Text>
                <Text>{selectedTicket.period}</Text>
                <Text>{selectedDiscountObj?.name}</Text>
                <Text>{finalPrice}</Text>
            </View>

            <TouchableOpacity>
                <Text>Kupuję bilet</Text>
            </TouchableOpacity>
        </View>
    )
};

export default SummaryPurchaseScreen;
