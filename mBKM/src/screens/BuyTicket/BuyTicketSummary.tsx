import React from "react";
import { ActivityIndicator,SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Line,Relief,Ticket } from "../../types/interfaces.tsx";
import stylesApp from "../../style/stylesApp.js";
import Header from "../../components/Global/Header/Header.tsx";
import { colors } from "../../style/styleValues.js";
import PaymentSelector from "../../components/Payments/PaymentSelector.tsx";
import { useBuyTicketSummaryLogic } from "../../hooks/BuyTicket/useBuyTicketSummaryLogic.tsx";
import style from "./style.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

type RouteParams = {
    selectedTicket: Ticket,
    selectedLines: Line | null,
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

            <View style={style.ticketBoxSummary}>
                <View style={style.leftBox}>
                    <Text style={style.textRight}>Rozdzaj:</Text>
                    <Text style={style.textRight}>Typ:</Text>
                    <Text style={style.textRight}>Linia:</Text>
                    <Text style={style.textRight}>Rodzaj:</Text>
                    <Text style={style.textRight}>Ważny od:</Text>
                </View>
                <View style={style.rightBox}>
                    <Text style={style.textLeft}>Bilet {selectedTicket.typeLabel}</Text>
                    <Text style={style.textLeft}>{ selectedRelief?.name }</Text>
                    <Text style={style.textLeft}>{ line?.name }</Text>
                    <Text style={style.textLeft}>{selectedTicket.periodLabel || '—'}</Text>
                    <Text style={style.textLeft}>{parsedDate ? parsedDate.toLocaleDateString() : '-'}</Text>
                </View>

            </View>

            <Text style={stylesApp.normalH3}>Wybierz rodzaj płatności</Text>

            <PaymentSelector
                paymentMethodId={paymentMethodId}
                setPaymentMethodId={setPaymentMethodId}
                methods={filteredMethods} />

            <View style={style.summaryBox}>
                <Text style={style.finalPrice}>Do zapłaty: <Text style={stylesApp.boldText}>{finalPrice.toFixed(2)} zł</Text></Text>
                <TouchableOpacity style={stylesApp.mainButton} onPress={handleBuyTicket}>
                    <Text style={stylesApp.whiteBoldCenterText}>Kupuję bilet</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
};

export default BuyTicketSummary;
