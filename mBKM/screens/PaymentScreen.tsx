import React from "react";
import { SafeAreaView,Text,View } from "react-native";
import stylesApp from "../style/stylesApp.js";
import { paymentMethods } from "../repositories/Data.tsx";
import { useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import WalletPayment from "../components/WalletPayment.tsx";
import CardPayment from "../components/CardPayment.tsx";
import OnlinePayment from "../components/OnlinePayment.tsx";

type RouteParams = {
    orderNumber: number,
    paymentMethodId: number,
    transactionAmount: number,
}

type RootStackParamList = {
    Home: undefined;
    UserPanel: {screen: 'Tickets'| 'Wallet'};
    PaymentScreen: undefined;
    Wallet: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'PaymentScreen'>;
const PaymentScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {orderNumber, paymentMethodId, transactionAmount} = route.params as RouteParams;
    const paymentNumber = Math.floor(Math.random() * 10000);


    const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethodId);

    return (
        <SafeAreaView style={stylesApp.popupContainer}>
            <Text style={stylesApp.popupText}>Transakcja nr: {orderNumber}</Text>

            <View style={{gap: 5}}>
                <Text style={stylesApp.whiteNormalCenterText}>Metoda płatności: {selectedPaymentMethod?.label}</Text>
                <Text style={stylesApp.whiteNormalCenterText}>Kwota transakcji: <Text style={stylesApp.boldText}>{transactionAmount.toFixed(2)} zł</Text></Text>
            </View>
            {selectedPaymentMethod?.label === 'Portfel' && (
                <WalletPayment transactionAmount={transactionAmount} navigation={navigation} />
            )}

            {selectedPaymentMethod?.label === 'Karta' && (
                <CardPayment
                    paymentNumber={paymentNumber}
                    transactionAmount={transactionAmount}
                    navigation={navigation}
                />
            )}

            {selectedPaymentMethod?.label === 'Online' && (
                <OnlinePayment
                    paymentNumber={paymentNumber}
                    transactionAmount={transactionAmount}
                    navigation={navigation}
                />
            )}
        </SafeAreaView>
    );
};

export default PaymentScreen;
