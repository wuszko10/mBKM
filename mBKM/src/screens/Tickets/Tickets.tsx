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
    const { userTickets, tickets, statusTypes, reliefs, isLoading } = useTicketLogic();

    function handleTicketDetails(item: UserTicket) {
        navigation.navigate('TicketDetails', {userTicketId: item.id});
    }

    const renderItem= ({item} : {item: UserTicket}) => {

        const ticketType = tickets && (tickets.find(type => type._id === item.ticketId));
        const statusType = statusTypes && (statusTypes.find(s => s.id === item.statusId));
        const reliefType = reliefs && (reliefs.find(r => r._id === item.reliefId))

        return (
            <TouchableOpacity onPress={() => handleTicketDetails(item)}>
                <View style={stylesApp.flatlistItem}>
                    <Text style={stylesApp.ticketTypeText}>
                        Bilet {ticketType?.typeLabel} {ticketType?.periodLabel}
                    </Text>
                    <Text style={stylesApp.itemText}>Typ: <Text style={stylesApp.boldText}>{reliefType?.name}</Text></Text>
                    <Text style={stylesApp.itemText}>Linie: <Text style={stylesApp.boldText}>{ticketType?.lineLabel}</Text></Text>
                    <Text style={stylesApp.itemText}>Status: <Text style={stylesApp.boldText}>{statusType?.label}</Text></Text>
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

            { userTickets && userTickets.length > 0 ? (
                <FlatList
                    style={stylesApp.flatlist}
                    data={userTickets}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <View style={stylesApp.emptyFlatListContainer}>
                    <Text style={stylesApp.emptyFlatListText}>Brak biletów</Text>
                </View>

            )}


        </SafeAreaView>
    )
};

const localStyles = StyleSheet.create({
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
