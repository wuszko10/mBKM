import React from "react";
import { ActivityIndicator,SafeAreaView,Text,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { useRoute } from "@react-navigation/native";
import WalletPayment from "../../components/Payments/WalletPayment.tsx";
import CardPayment from "../../components/Payments/CardPayment.tsx";
import OnlinePayment from "../../components/Payments/OnlinePayment.tsx";
import { usePaymentLogic } from "../../hooks/Payment/usePaymentLogic.tsx";
import { colors } from "../../style/styleValues.js";
import { BLIK_PAYMENT,CARD_PAYMENT,WALLET_PAYMENT } from "../../../variables.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

type RouteParams = {
    transactionId: string,
    transactionNumber: string,
    paymentMethodId: string,
    transactionAmount: number,
    userTicketId: string,
}
const PaymentScreen = () => {

    const route = useRoute();
    const {transactionId, transactionNumber, paymentMethodId, transactionAmount, userTicketId} = route.params as RouteParams;
    const { token } = useAuth();

    const {
        method,
        isLoading,
        closePopup,
        setStopPayment,
        setWalletPayment
    } = usePaymentLogic(transactionId, paymentMethodId, userTicketId, token);


    if (isLoading) {
        return (
            <View style={stylesApp.popupContainer}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
    }

    return (
        <SafeAreaView style={stylesApp.popupContainer}>
            <Text style={stylesApp.popupText}>Transakcja nr: {transactionNumber}</Text>

            <View style={{gap: 5}}>
                <Text style={stylesApp.whiteNormalCenterText}>Kwota transakcji: <Text style={stylesApp.boldText}>{transactionAmount.toFixed(2)} zł</Text></Text>
            </View>

            {method?.name === WALLET_PAYMENT && (
                <WalletPayment
                    transactionId={transactionId}
                    transactionAmount={transactionAmount}
                    userTicketId={userTicketId}
                    setStopPayment={setStopPayment}
                    setWalletPayment={setWalletPayment}
                    closePopup={closePopup}
                />
            )}

            {method?.name === CARD_PAYMENT && (
                <CardPayment
                    transactionId={transactionId}
                    transactionAmount={transactionAmount}
                    userTicketId={userTicketId}
                    setStopPayment={setStopPayment}
                    cancelPopup={closePopup}
                />
            )}

            {method?.name === BLIK_PAYMENT && (
                <OnlinePayment
                    transactionId={transactionId}
                    transactionAmount={transactionAmount}
                    userTicketId={userTicketId}
                    setStopPayment={setStopPayment}
                    cancelAction={closePopup}
                />
            )}

        </SafeAreaView>
    );
};

export default PaymentScreen;

