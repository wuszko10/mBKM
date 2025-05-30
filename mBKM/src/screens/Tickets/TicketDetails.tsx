import React from "react";
import { Image,SafeAreaView,ScrollView,Text,TouchableOpacity,View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/Global/Header/Header.tsx";
import stylesApp from "../../style/appStyle.js";
import { useTicketDetailsLogic } from "../../hooks/Ticket/useTicketDetailsLogic.tsx";
import { ALL_LINES,DEFAULT_TICKET_STATUS,SINGLE_TICKET } from "../../../variables.tsx";
import { dimensions } from "../../style/styleValues.js";
import style from './style.tsx';
import {Loading} from "../../components/Global/Loading/Loading.tsx";


type RouteParams = {
    userTicketId: string,
}

const TicketDetails = () => {

    const route = useRoute();
    const { userTicketId} = route.params as RouteParams;
    const {
        userTicket,
        transaction,
        ticket,
        status,
        method,
        relief,
        line,
        isLoading,
        handleValidateTicket
    } = useTicketDetailsLogic(userTicketId);


    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <ScrollView style={stylesApp.scrollContainer}>
        <SafeAreaView style={stylesApp.container}>
            <Header title={"Bilet "+userTicket?.number}/>

            <View style={style.userTicketContainer}>

                <View style={style.smallGapContainer}>
                    <Text style={style.ticketTypeText}>Bilet {ticket?.typeLabel} {ticket?.periodLabel}</Text>
                    <Text style={stylesApp.itemText}>Typ: <Text style={stylesApp.boldText}>{relief?.name}</Text></Text>
                    <Text style={stylesApp.itemText}>Linia: <Text style={stylesApp.boldText}>{ticket?.lineLabel}{line?.number !== ALL_LINES ? (" – " + line?.name) : ''}</Text></Text>
                    <Text style={stylesApp.itemText}>Cena: <Text style={stylesApp.boldText}>{transaction?.finalPrice.toFixed(2)} zł</Text></Text>
                    <Text style={stylesApp.itemText}>Status: <Text style={stylesApp.boldText}>{status?.label}</Text></Text>
                </View>

                { userTicket &&
                    <Image
                        source={{ uri: userTicket?.QRCode }}
                        style={{height:340, width: 340, padding: 0, margin: 0, borderRadius: dimensions.radius, alignSelf: "center"}}
                        resizeMode="contain"
                    />
                }
            </View>

            { (ticket?.typeName === SINGLE_TICKET &&  status?.name === DEFAULT_TICKET_STATUS) && (
                <TouchableOpacity style={[stylesApp.mainButton, {marginVertical: 20}]} onPress={handleValidateTicket}>
                    <Text style={stylesApp.whiteBoldCenterText}>Skasuj bilet</Text>
                </TouchableOpacity>
            )}

            { userTicket?.ticketStartDate && (
                <View style={style.smallGapContainer}>
                    <Text style={stylesApp.itemText}>Ważny od: <Text style={stylesApp.boldText}>{userTicket?.ticketStartDate ? (new Date(userTicket?.ticketStartDate)).toLocaleString() : '–––'}</Text></Text>
                    <Text style={stylesApp.itemText}>Ważny do: <Text style={stylesApp.boldText}>{userTicket?.ticketEndDate ? (new Date(userTicket?.ticketEndDate)).toLocaleString() : '–––'}</Text></Text>
                </View>
            )}

            <View style={stylesApp.divider}/>
            <View style={style.smallGapContainer}>
                <Text style={stylesApp.itemText}>Numer transakcji: <Text style={stylesApp.boldText}>{transaction?.number}</Text></Text>
                <Text style={stylesApp.itemText}>Metoda płatności: <Text style={stylesApp.boldText}>{method?.label}</Text></Text>
                <Text style={stylesApp.itemText}>Data zakupu: <Text style={stylesApp.boldText}>{transaction && new Date(transaction.paymentDate).toLocaleString()}</Text></Text>
            </View>

            <View style={stylesApp.separator}/>

        </SafeAreaView>
        </ScrollView>
    )
};

export default TicketDetails;
