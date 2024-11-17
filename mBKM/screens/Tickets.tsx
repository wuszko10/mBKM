import React from 'react';
import { FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../style/stylesApp.js";
import { tickets } from "../repositories/Data.tsx";
import { colors,dimensions } from "../style/styleValues.js";
import { Ticket,TicketsPurchased } from "../repositories/interfaces.tsx";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Tickets: undefined;
    Home: undefined;
    TicketDetails: {selectedTicket: TicketsPurchased};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Tickets'>;

const Tickets = () => {

    const navigation = useNavigation<NavigationProp>();

    function handleTicketDetails(item: TicketsPurchased) {
        navigation.navigate('TicketDetails', {selectedTicket: item});
    }

    const renderItem= ({item} : {item: TicketsPurchased}) => {

        return (
            <TouchableOpacity onPress={() => handleTicketDetails(item)}>
                <View style={stylesApp.flatlistItem}>
                    <Text style={localStyles.text}>Numer biletu: {item.number}</Text>
                    <Text style={localStyles.text}>Cena: {item.finalPrice.toFixed(2)} zł</Text>
                    <Text style={localStyles.text}>Date: {new Date(item.purchaseDate).toLocaleString()}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={stylesApp.container}>

            <Text>Moje bilety</Text>

            <FlatList
                style={stylesApp.flatlist}
                data={tickets}
                renderItem={renderItem}
                keyExtractor={(item) => item.number}
            />

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
        fontSize: 16
    }
});

export default Tickets;
