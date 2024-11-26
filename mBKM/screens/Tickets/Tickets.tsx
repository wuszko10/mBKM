import React from 'react';
import { FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { ticketOrderTransactions,ticketsData } from "../../repositories/Data.tsx";
import { colors,dimensions } from "../../style/styleValues.js";
import { TicketOrderTransaction } from "../../repositories/interfaces.tsx";
import { useNavigation,useNavigationState } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../../components/Global/Header.tsx";
import Entypo from "react-native-vector-icons/Entypo";

type RootStackParamList = {
    Tickets: undefined;
    Home: undefined;
    Purchase: undefined;
    TicketDetails: {selectedTransaction: TicketOrderTransaction};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Tickets'>;

const Tickets = () => {

    const navigation = useNavigation<NavigationProp>();
    const navigationState = useNavigationState(state => state);
    console.log('Navigation State:', navigationState);

    function handleTicketDetails(item: TicketOrderTransaction) {
        navigation.navigate('TicketDetails', {selectedTransaction: item});
    }

    function getTicketInfo(ticketTypeId: number) {
        return ticketsData.find(type => type._id === ticketTypeId);
    }

    const renderItem= ({item} : {item: TicketOrderTransaction}) => {

        return (
            <TouchableOpacity onPress={() => handleTicketDetails(item)}>
                <View style={stylesApp.flatlistItem}>
                    {getTicketInfo(item.ticketTypeId) && (
                        <Text style={localStyles.text}>
                            Bilet {getTicketInfo(item.ticketTypeId)?.type} na {getTicketInfo(item.ticketTypeId)?.lines} linię
                        </Text>
                    )}
                    <Text style={localStyles.text}>Numer biletu: <Text style={stylesApp.boldText}>{item.number}</Text></Text>
                    <Text style={localStyles.text}>Cena: {item.finalPrice.toFixed(2)} zł</Text>
                    <Text style={localStyles.text}>Date zakupu: {new Date(item.purchaseDate).toLocaleString()}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Moje bilety" />

            <TouchableOpacity onPress={() => navigation.navigate('Purchase')} style={localStyles.addButton}>
                <Entypo name="plus" size={35} style={localStyles.icon} />
                <Text style={{color: colors.appFirstColor, fontSize: 14}}>Kup bilet</Text>
            </TouchableOpacity>

            <FlatList
                style={stylesApp.flatlist}
                data={ticketOrderTransactions}
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
