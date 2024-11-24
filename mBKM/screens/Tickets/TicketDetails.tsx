import React from "react";
import { SafeAreaView,Text,TouchableOpacity } from "react-native";
import { Ticket,TicketOrderTransaction } from "../../repositories/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation,useRoute } from "@react-navigation/native";
import Header from "../../components/Global/Header.tsx";
import stylesApp from "../../style/stylesApp.js";
import { useCheckLocation } from "../../components/Global/CheckLocation.tsx";
import { startListening } from "react-native-gesture-handler/lib/typescript/handlers/gestures/eventReceiver";

type RootStackParamList = {
    TicketDetails: undefined;
    Home: undefined;
    Tickets: undefined;
    ValidateTicket: {transactionId: number};
};

type RouteParams = {
    selectedTransaction: TicketOrderTransaction;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'TicketDetails'>;
const TicketDetails = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {selectedTransaction} = route.params as RouteParams;


    const handleValidateTicket = () => {
        navigation.navigate("ValidateTicket", {
            transactionId: selectedTransaction._id,
        })
    }

    return (
        <SafeAreaView style={stylesApp.container}>
            <Header title={"Bilet "+selectedTransaction.number}/>
            <Text style={stylesApp.blackText}>Numer biletu: {selectedTransaction.number}</Text>
            <Text style={stylesApp.blackText}>Cena: {selectedTransaction.finalPrice.toFixed(2)} zł</Text>
            <Text style={stylesApp.blackText}>Data zakupu: {new Date(selectedTransaction.purchaseDate).toLocaleString()}</Text>

            <TouchableOpacity style={stylesApp.mainButton} onPress={handleValidateTicket}>
                <Text style={stylesApp.whiteBoldCenterText}>Skasuj bilet</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default TicketDetails;
