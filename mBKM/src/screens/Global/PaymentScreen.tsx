import React,{ useEffect,useState } from "react";
import { ActivityIndicator,SafeAreaView,Text,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { CommonActions,useNavigation,useRoute } from "@react-navigation/native";
import WalletPayment from "../../components/Payments/WalletPayment.tsx";
import CardPayment from "../../components/Payments/CardPayment.tsx";
import OnlinePayment from "../../components/Payments/OnlinePayment.tsx";
import { usePaymentLogic } from "../../hooks/Payment/usePaymentLogic.tsx";
import { colors } from "../../style/styleValues.js";
import { BLIK_PAYMENT,CARD_PAYMENT,WALLET_PAYMENT } from "../../../variables.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { rollbackTransaction } from "../../services/transaction.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { rollbackTopUp } from "../../services/topUp.service.tsx";

type RouteParams = {
    transactionId: string,
    transactionNumber: string,
    paymentMethodId: string,
    transactionAmount: number,
    userTicketId: string,
}
const PaymentScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {transactionId, transactionNumber, paymentMethodId, transactionAmount, userTicketId} = route.params as RouteParams;
    const { token } = useAuth();
    const [stopPayment, setStopPayment] = useState(true);

    const {
        method,
        isLoading,
        closePopup,
    } = usePaymentLogic(transactionId, paymentMethodId, userTicketId);


    useEffect(() => {
        return navigation.addListener('beforeRemove', async (e) => {
            if (!stopPayment) {
                return;
            }
            if (userTicketId) {
                await rollbackTransaction(transactionId,userTicketId,token?token:"");
                closePopup();
            } else {
                await rollbackTopUp(transactionId,token?token:"");
                closePopup();
            }
        });
    }, [navigation, transactionId, userTicketId, stopPayment]);

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

