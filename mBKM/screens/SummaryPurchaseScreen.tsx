import React from 'react';
import { SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ticket } from "../repositories/interfaces.tsx";
import { discounts } from "../repositories/Data.tsx";
import stylesApp from "../style/stylesApp.js";
import Header from "../components/Header.tsx";

type RootStackParamList = {
    Purchase: undefined;
    SummaryPurchaseScreen: {selectedTicket: Ticket, selectedDiscount: string, selectedDate?: string, finalPrice: number};
    Home: undefined;
    Tickets: undefined;
};

type RouteParams = {
    selectedTicket: Ticket;
    selectedDiscount: string;
    selectedDate?: string;
    finalPrice: number;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'SummaryPurchaseScreen'>;
const SummaryPurchaseScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {selectedTicket, selectedDiscount, selectedDate, finalPrice} = route.params as RouteParams;
    const currentDate = new Date();

    const selectedDiscountObj = discounts.find(discount => discount._id === selectedDiscount);

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Podsumowanie"/>

            <Text style={stylesApp.normalH3}>Wybrany bilet</Text>
            <View>
                <Text>{selectedTicket.type}</Text>
                <Text>{selectedTicket.lines}</Text>
                <Text>{selectedTicket.period}</Text>
                <Text>{selectedDate}</Text>
                <Text>{selectedDiscountObj?.name}</Text>
                <Text>{finalPrice}</Text>
            </View>

            <Text style={stylesApp.normalH3}>Wybierz rodzaj płatności</Text>

            <TouchableOpacity style={stylesApp.mainButton}>
                <Text style={stylesApp.whiteBoldCenterText}>Kupuję bilet</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default SummaryPurchaseScreen;
