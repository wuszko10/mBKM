import React from "react";
import { Image,SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import { Ticket,TicketOrderTransaction } from "../../types/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation,useRoute } from "@react-navigation/native";
import Header from "../../components/Global/Header.tsx";
import stylesApp from "../../style/stylesApp.js";
import { ticketsData } from "../../repositories/Data.tsx";
import QRCode from "../../components/Tickets/QRCode.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { useTicketDetailsLogic } from "../../hooks/Ticket/useTicketDetailsLogic.tsx";
import { DEFAULT_TICKET_STATUS,SINGLE_TICKET } from "../../../variables.tsx";


type RouteParams = {
    userTicketId: string,
}

const TicketDetails = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const { userTicketId} = route.params as RouteParams;
    const { userTicket, transaction, ticket, status, isLoading} = useTicketDetailsLogic(userTicketId);

    const handleValidateTicket = () => {
        if (userTicket)
            navigation.navigate("ValidateTicket", {
                userTicketId: userTicket._id,
            })
    }

    return (
        <SafeAreaView style={stylesApp.container}>
            <Header title={"Bilet "+userTicket?.number}/>
            <Text style={stylesApp.blackText}>Numer transakcji: {transaction?.number}</Text>
            <Text style={stylesApp.blackText}>Cena: {transaction?.finalPrice} zł</Text>
            <Text style={stylesApp.blackText}>Linie: {ticket?.lineLabel}</Text>
            <Text style={stylesApp.blackText}>Status: {status?.label}</Text>
            <Text style={stylesApp.blackText}>Data zakupu: {transaction && new Date(transaction.paymentDate).toLocaleString()}</Text>


            <Text style={stylesApp.blackText}>Skasowany dnia: {userTicket?.ticketStartDate ? (new Date(userTicket?.ticketEndDate)).toLocaleString() : '–––'}</Text>
            <Text style={stylesApp.blackText}>Ważny do: {userTicket?.ticketEndDate ? (new Date(userTicket?.ticketEndDate)).toLocaleString() : '–––'}</Text>

            { userTicket &&
                <Image
                    source={{ uri: userTicket?.QRCode }}
                    style={{height: 350, width:"100%", padding: 0, margin: 0}}
                    resizeMode="contain"
                />
            }




            { (ticket?.typeName === SINGLE_TICKET &&  status?.name === DEFAULT_TICKET_STATUS) && (


                <TouchableOpacity style={stylesApp.mainButton} onPress={handleValidateTicket}>
                    <Text style={stylesApp.whiteBoldCenterText}>Skasuj bilet</Text>
                </TouchableOpacity>
            )}

        </SafeAreaView>
    )
};

export default TicketDetails;

/*
<QRCode ticketId={selectedTransaction.number.toString()}/>
 */ //generowanie kodu QR
