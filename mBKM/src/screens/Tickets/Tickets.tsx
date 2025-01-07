import React from 'react';
import { ActivityIndicator,FlatList,SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/appStyle.js";
import { colors } from "../../style/styleValues.js";
import { UserTicket } from "../../types/interfaces.tsx";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Global/Header/Header.tsx";
import Entypo from "react-native-vector-icons/Entypo";
import {NavigationProp} from "../../types/navigation.tsx";
import { useTicketLogic } from "../../hooks/Ticket/useTicketLogic.tsx";
import { ALL_LINES } from "../../../variables.tsx";
import style from "./style.tsx";

const Tickets = () => {

    const navigation = useNavigation<NavigationProp>();
    const {
        userTickets,
        tickets,
        statusTypes,
        reliefs,
        lines,
        isLoading,
        handleTicketDetails
    } = useTicketLogic();


    const renderItem= ({item} : {item: UserTicket}) => {

        const ticketType = tickets && (tickets.find(type => type._id === item.ticketId));
        const statusType = statusTypes && (statusTypes.find(s => s.id === item.statusId));
        const reliefType = reliefs && (reliefs.find(r => r._id === item.reliefId));
        const line = (lines) && (lines.find(r => r.id === item.lineId));

        return (
            <TouchableOpacity onPress={() => handleTicketDetails(item)}>
                <View style={stylesApp.flatlistItem}>
                    <Text style={style.ticketTypeText}>
                        Bilet {ticketType?.typeLabel} {ticketType?.periodLabel}
                    </Text>
                    <Text style={stylesApp.itemText}>Typ: <Text style={stylesApp.boldText}>{reliefType?.name}</Text></Text>
                    <Text style={stylesApp.itemText}>Linia: <Text style={stylesApp.boldText}>{ticketType?.lineLabel}{line?.number !== ALL_LINES && (" – " + line?.name)}</Text></Text>
                    <Text style={stylesApp.itemText}>Status: <Text style={stylesApp.boldText}>{statusType?.label}</Text></Text>
                    <Text style={stylesApp.itemText}>Data zakupu: <Text style={stylesApp.boldText}>{(new Date(item?.purchaseDate)).toLocaleString()}</Text></Text>
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

            <TouchableOpacity onPress={() => navigation.navigate('BuyTicketSelection')} style={style.addButton}>
                <Entypo name="plus" size={35} style={style.icon} />
                <Text style={style.buyTicketText}>Kup bilet</Text>
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

export default Tickets;
