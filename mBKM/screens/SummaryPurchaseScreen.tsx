import React,{ useEffect,useState } from "react";
import { SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ticket } from "../repositories/interfaces.tsx";
import { discounts,lines } from "../repositories/Data.tsx";
import stylesApp from "../style/stylesApp.js";
import Header from "../components/Header.tsx";
import { colors,dimensions } from "../style/styleValues.js";
import PaymentSelector from "../components/PaymentSelector.tsx";

type RootStackParamList = {
    Purchase: undefined;
    SummaryPurchaseScreen: undefined;
    Home: undefined;
    Tickets: undefined;
};

type RouteParams = {
    selectedTicket: Ticket;
    selectedLines?: number;
    selectedRelief: string;
    selectedDate?: string;
    finalPrice: number;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'SummaryPurchaseScreen'>;
const SummaryPurchaseScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {selectedTicket, selectedLines, selectedRelief, selectedDate, finalPrice} = route.params as RouteParams;
    const parsedDate = selectedDate ? new Date(selectedDate) : undefined;
    const [lineText, setLineText] = useState("");

    const selectedReliefObj = discounts.find(discount => discount._id === selectedRelief);
    const selectedLinesObj = lines.find(line => line._id == selectedLines);

    useEffect (() => {
        if (selectedTicket.lines === "1") {
            return setLineText("jedną linię")
        } else {
            return setLineText(selectedTicket.lines + " linie")
        }
    });

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Podsumowanie"/>

            <Text style={stylesApp.normalH3}>Wybrany bilet</Text>

            <View style={localStyle.ticketBox}>
                <View>
                    <Text style={localStyle.textRight}>Rozdzaj:</Text>
                    <Text style={localStyle.textRight}>Typ:</Text>
                    <Text style={localStyle.textRight}>Linia:</Text>
                    <Text style={localStyle.textRight}>Rodzaj:</Text>
                    <Text style={localStyle.textRight}>Ważny od:</Text>
                </View>
                <View>
                    <Text style={localStyle.textLeft}>{selectedTicket.type}</Text>
                    <Text style={localStyle.textLeft}>{selectedReliefObj?.name}</Text>
                    <Text style={localStyle.textLeft}>{selectedLinesObj?.line}</Text>
                    <Text style={localStyle.textLeft}>{selectedTicket.period || '—'}</Text>
                    <Text style={localStyle.textLeft}>{parsedDate ? parsedDate.toLocaleDateString() : '—'}</Text>
                </View>

            </View>

            <Text style={stylesApp.normalH3}>Wybierz rodzaj płatności</Text>

            <PaymentSelector />

            <View style={stylesApp.summaryBox}>
                <Text style={stylesApp.finalPrice}>Do zapłaty: <Text style={stylesApp.boldText}>{finalPrice.toFixed(2)} zł</Text></Text>
                <TouchableOpacity style={stylesApp.mainButton}>
                    <Text style={stylesApp.whiteBoldCenterText}>Kupuję bilet</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
};

const localStyle = StyleSheet.create({
    ticketBox: {
        backgroundColor: colors.appThirdColor,
        padding: dimensions.appNormalPadding,
        borderRadius: dimensions.radius,
        gap: 10,
        flexDirection: "row"
    },
    textRight: {
        textAlign: "right",
        fontSize: 15,

    },
    textLeft: {
        color: colors.textColorBlack,
        fontWeight: "bold",
        fontSize: 15,
    }
});

export default SummaryPurchaseScreen;
