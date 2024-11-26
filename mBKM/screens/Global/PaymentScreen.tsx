import React from "react";
import { SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { paymentMethods } from "../../repositories/Data.tsx";
import { CommonActions,useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import WalletPayment from "../../components/Payments/WalletPayment.tsx";
import CardPayment from "../../components/Payments/CardPayment.tsx";
import OnlinePayment from "../../components/Payments/OnlinePayment.tsx";

type RouteParams = {
    ticketOrderTransactionId: number,
    paymentMethodId: number,
    transactionAmount: number,
}

type RootStackParamList = {
    Home: undefined;
    UserPanel: {screen: 'Tickets' | 'Wallet'};
    PaymentScreen: undefined;
    ValidateTicket: {transactionId: number};
    Wallet: undefined;

};

type NavigationProp = StackNavigationProp<RootStackParamList, 'PaymentScreen'>;
const PaymentScreen = () => {

    const navigation = useNavigation<NavigationProp>()

    const route = useRoute();
    const {ticketOrderTransactionId, paymentMethodId, transactionAmount} = route.params as RouteParams;
    const paymentNumber = Math.floor(Math.random() * 10000);
    const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethodId);

    const confirmValidateTicketPopup = () => {
        navigation.dispatch( (state) => {
            const userPanelIndex = state.routes.findIndex(route => route.name === "UserPanel");

            return CommonActions.reset({
                index: userPanelIndex !== -1 ? userPanelIndex : 0,
                routes: [
                    { name: 'UserPanel', state: { routes: [{ name: 'Tickets' }] } },
                    { name: 'ValidateTicket', params: { transactionId: ticketOrderTransactionId } },
                ],
            });
        });
    }

    const confirmWalletPopup = () => {
        navigation.dispatch( (state) => {
            const userPanelIndex = state.routes.findIndex(route => route.name === "UserPanel");

            return CommonActions.reset({
                index: userPanelIndex !== -1 ? userPanelIndex : 0,
                routes: [
                    { name: 'UserPanel', state: { routes: [{ name: 'Wallet' }] } },
                ],
            });
        });
    }
    const closePopup = () => {
        navigation.popTo('UserPanel', {screen: 'Tickets'});
    }

    return (
        <SafeAreaView style={stylesApp.popupContainer}>
            <Text style={stylesApp.popupText}>Transakcja nr: {ticketOrderTransactionId}</Text>

            <View style={{gap: 5}}>
                <Text style={stylesApp.whiteNormalCenterText}>Metoda płatności: {selectedPaymentMethod?.label}</Text>
                <Text style={stylesApp.whiteNormalCenterText}>Kwota transakcji: <Text style={stylesApp.boldText}>{transactionAmount.toFixed(2)} zł</Text></Text>
            </View>
            {selectedPaymentMethod?.label === 'Portfel' && (
                <WalletPayment
                    transactionId={ticketOrderTransactionId}
                    transactionAmount={transactionAmount}
                    confirmValidateTicketPopup={confirmValidateTicketPopup}
                    confirmWalletPopup={confirmWalletPopup}
                    closePopup={closePopup}
                />
            )}

            {selectedPaymentMethod?.label === 'Karta' && (
                <CardPayment
                    transactionId={ticketOrderTransactionId}
                    paymentNumber={paymentNumber}
                    transactionAmount={transactionAmount}
                    cancelPopup={closePopup}
                />
            )}

            {selectedPaymentMethod?.label === 'Online' && (
                <OnlinePayment
                    transactionId={ticketOrderTransactionId}
                    paymentNumber={paymentNumber}
                    transactionAmount={transactionAmount}
                    cancelAction={closePopup}
                />
            )}

        </SafeAreaView>
    );
};

export default PaymentScreen;

/*

 */
