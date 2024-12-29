import React from "react";
import { ActivityIndicator,SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Relief,Ticket } from "../../../types/interfaces.tsx";
import stylesApp from "../../../style/stylesApp.js";
import Header from "../../../components/Global/Header.tsx";
import { colors } from "../../../style/styleValues.js";
import PaymentSelector from "../../../components/Payments/PaymentSelector.tsx";
import { useBuyTicketSummaryLogic } from "../../../hooks/BuyTicket/useBuyTicketSummaryLogic.tsx";
import { style as localStyle } from "./style.tsx";
import { useAuth } from "../../../context/AuthContext.tsx";

type RouteParams = {
    selectedTicket: Ticket,
    selectedLines: string | null,
    selectedRelief: Relief | null,
    finalPrice: number,
    selectedDate?: string,
}
const BuyTicketSummary = () => {

    const route = useRoute();
    const {selectedTicket, selectedLines, selectedRelief, selectedDate, finalPrice} = route.params as RouteParams;
    const parsedDate = selectedDate && new Date(selectedDate);
    const { token, userId } = useAuth();

    const {
        line,
        paymentMethodId,
        filteredMethods,
        isLoading,
        setPaymentMethodId,
        handleBuyTicket
    } = useBuyTicketSummaryLogic(selectedTicket, selectedLines, selectedRelief, selectedDate, finalPrice, userId, token);


    if (isLoading) {
        return (
            <View style={stylesApp.container}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
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
                    <Text style={localStyle.textLeft}>Bilet {selectedTicket.typeLabel}</Text>
                    <Text style={localStyle.textLeft}>{ selectedRelief?.name }</Text>
                    <Text style={localStyle.textLeft}>{ line?.name }</Text>
                    <Text style={localStyle.textLeft}>{selectedTicket.periodLabel || '—'}</Text>
                    <Text style={localStyle.textLeft}>{parsedDate ? parsedDate.toLocaleDateString() : '-'}</Text>
                </View>

            </View>

            <Text style={stylesApp.normalH3}>Wybierz rodzaj płatności</Text>

            <PaymentSelector
                paymentMethodId={paymentMethodId}
                setPaymentMethodId={setPaymentMethodId}
                methods={filteredMethods} />

            <View style={stylesApp.summaryBox}>
                <Text style={stylesApp.finalPrice}>Do zapłaty: <Text style={stylesApp.boldText}>{finalPrice.toFixed(2)} zł</Text></Text>
                <TouchableOpacity style={stylesApp.mainButton} onPress={handleBuyTicket}>
                    <Text style={stylesApp.whiteBoldCenterText}>Kupuję bilet</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
};

export default BuyTicketSummary;
