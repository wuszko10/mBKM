import React,{ useEffect,useState } from "react";
import { SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentMethod,Ticket } from "../repositories/interfaces.tsx";
import { reliefs,lines,paymentMethods } from "../repositories/Data.tsx";
import stylesApp from "../style/stylesApp.js";
import Header from "../components/Header.tsx";
import { colors,dimensions } from "../style/styleValues.js";
import PaymentSelector from "../components/PaymentSelector.tsx";

type RootStackParamList = {
    Purchase: undefined;
    SummaryPurchaseScreen: undefined;
    Home: undefined;
    Tickets: undefined;
    PaymentScreen: {orderNumber: number, paymentMethodId: number, transactionAmount: number};
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
    const [paymentMethodId, setPaymentMethodId] = useState(0);

    const selectedReliefObj = reliefs.find(discount => discount._id === selectedRelief);
    const selectedLinesObj = lines.find(line => line._id == selectedLines);

    const filteredMethods: PaymentMethod[] = paymentMethods
        .filter(method => {
            return selectedTicket.type === "jednorazowy" ? method.label === "Portfel" :  method.label !== "Portfel";
        });

    const handleBuyTicket = () => {
        if (paymentMethodId) {
            const orderNumber = Math.floor(Math.random() * 10000);
            navigation.navigate('PaymentScreen', {
                orderNumber,
                paymentMethodId,
                transactionAmount: finalPrice,
            })
        } else {
            console.log("Wybierz metodę płatności")
        }
    }

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Podsumowanie"/>

            <Text style={stylesApp.normalH3}>Wybrany bilet</Text>

            <View style={localStyle.ticketBox}>
                <View style={localStyle.leftBox}>
                    <Text style={localStyle.textRight}>Rozdzaj:</Text>
                    <Text style={localStyle.textRight}>Typ:</Text>
                    <Text style={localStyle.textRight}>Linia:</Text>
                    <Text style={localStyle.textRight}>Rodzaj:</Text>
                    <Text style={localStyle.textRight}>Ważny od:</Text>
                </View>
                <View style={localStyle.rightBox}>
                    <Text style={localStyle.textLeft}>{selectedTicket.type}</Text>
                    <Text style={localStyle.textLeft}>{selectedReliefObj?.name}</Text>
                    <Text style={localStyle.textLeft}>{selectedLinesObj?.line}</Text>
                    <Text style={localStyle.textLeft}>{selectedTicket.period || '—'}</Text>
                    <Text style={localStyle.textLeft}>{parsedDate ? parsedDate.toLocaleDateString() : '—'}</Text>
                </View>

            </View>

            <Text style={stylesApp.normalH3}>Wybierz rodzaj płatności</Text>

            <PaymentSelector paymentMethodId={paymentMethodId} setPaymentMethodId={setPaymentMethodId} methods={filteredMethods} />

            <View style={stylesApp.summaryBox}>
                <Text style={stylesApp.finalPrice}>Do zapłaty: <Text style={stylesApp.boldText}>{finalPrice.toFixed(2)} zł</Text></Text>
                <TouchableOpacity style={stylesApp.mainButton} onPress={handleBuyTicket}>
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
    leftBox: {
        flexGrow: 0.1,
        flexShrink: 0.1,
    },
    rightBox: {
        flexGrow: 0.9,
        flexShrink: 0.9,
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
