import React from 'react';
import { ActivityIndicator,FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { ticketOrderTransactions,ticketsData } from "../../repositories/Data.tsx";
import { colors,dimensions } from "../../style/styleValues.js";
import { TicketOrderTransaction,UserTicket } from "../../types/interfaces.tsx";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Global/Header.tsx";
import Entypo from "react-native-vector-icons/Entypo";
import {NavigationProp} from "../../types/navigation.tsx";
import { useTicketLogic } from "../../hooks/Ticket/useTicketLogic.tsx";

const Tickets = () => {

    const navigation = useNavigation<NavigationProp>();
    const { userTickets, tickets, statusTypes, isLoading } = useTicketLogic();

    function handleTicketDetails(item: UserTicket) {
        navigation.navigate('TicketDetails', {userTicketId: item.id});
    }

    const renderItem= ({item} : {item: UserTicket}) => {

        const ticketType = tickets && (tickets.find(type => type._id === item.ticketId));
        const statusType = statusTypes && (statusTypes.find(s => s.id === item.statusId));

        return (
            <TouchableOpacity onPress={() => handleTicketDetails(item)}>
                <View style={stylesApp.flatlistItem}>
                    <Text style={stylesApp.ticketTypeText}>
                        Bilet {ticketType?.typeLabel} na {ticketType?.lineLabel}
                    </Text>
                    <Text style={localStyles.text}>Numer biletu: <Text style={stylesApp.boldText}>{item.number}</Text></Text>
                    <Text style={localStyles.text}>Status: <Text style={stylesApp.boldText}>{statusType?.label}</Text></Text>
                    <Text style={localStyles.text}>Cena: <Text style={stylesApp.boldText}>{ticketType?.price.toFixed(2)} zł</Text></Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (isLoading) {
        return (
            <View style={stylesApp.container}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
    }

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Moje bilety" />

            <TouchableOpacity onPress={() => navigation.navigate('BuyTicketSelection')} style={localStyles.addButton}>
                <Entypo name="plus" size={35} style={localStyles.icon} />
                <Text style={{color: colors.appFirstColor, fontSize: 14}}>Kup bilet</Text>
            </TouchableOpacity>

            { userTickets ? (
                <FlatList
                    style={stylesApp.flatlist}
                    data={userTickets}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text>Brak biletów</Text>
            )}


        </SafeAreaView>
    )
};

const localStyles = StyleSheet.create({
    balanceContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 30,
        marginRight: dimensions.appNormalPadding,
        marginLeft: dimensions.appNormalPadding,
        backgroundColor: colors.appBg,
        borderRadius: dimensions.inputRadius,
    },

    balanceText:{
        color: colors.appFirstColor,
        fontSize: 40,
        fontWeight: 'bold',
    },

    transactionContainer: {
        padding: dimensions.appNormalPadding,
    },

    item: {
        marginLeft: 2,
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: 10
    },
    text: {
        fontSize: 16,
        color: colors.textColorBlack,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        position: "absolute",
        backgroundColor: '#D6F49D',
        borderRadius: 100,
        paddingRight: 15,
        bottom: 20,
        right: 20,
        zIndex: 10,
    },
    icon: {
        color: colors.appWhite,
        backgroundColor: colors.appFirstColor,
        padding: 5,
        borderRadius: 100,
    }
});

export default Tickets;
