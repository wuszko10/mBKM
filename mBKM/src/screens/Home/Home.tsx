import React,{ useState } from "react";
import { FlatList,ScrollView,StyleSheet,Text,TouchableOpacity,View, Animated } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.tsx";
import { colors,dimensions } from "../../style/styleValues.js";
import Icon from "react-native-vector-icons/FontAwesome";
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from "react-native-vector-icons/Entypo";
import { reliefs,ticketOrderTransactions,ticketsData } from "../../repositories/Data.tsx";
import { TicketOrderTransaction } from "../../types/interfaces.tsx";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import CountdownProgressBar from "../../components/Global/CountdownProgressBar.tsx";

type RootStackPramList = {
    Welcome: undefined;
    UserPanel: { screen: 'Tickets' | 'Wallet' };
    TicketDetails: {selectedTransaction: TicketOrderTransaction};
}

type NavigationProp = StackNavigationProp<RootStackPramList>
const Home = () => {

    const navigation = useNavigation<NavigationProp>();

    const { user} = useAuth();

    const [forValidation, setForValidation] = useState(false);
    const [activeTickets, setActiveTickets] = useState(false);



    const filteredTicketsForValidation = ticketOrderTransactions.filter(ticket => ticket.status === "zakupiony")
    const filteredActiveTicketsForValidation = ticketOrderTransactions.filter(ticket => ticket.status === "skasowany")

    function handleTicketDetails(item: TicketOrderTransaction) {
        navigation.navigate('TicketDetails', {selectedTransaction: item});
    }

    const renderItem= ({item} : {item: TicketOrderTransaction}) => {

        const typeId = ticketsData.find(type => type._id === item.ticketTypeId);
        const reliefId = reliefs.find(relief => relief._id === item.discountId);

        return (
            <TouchableOpacity onPress={() => handleTicketDetails(item)} style={{marginHorizontal: 5, marginVertical: 10}}>
                <View style={localStyles.ticketItemHorizontal}>
                    <View style={localStyles.dateBox}>
                        <Foundation  name={"calendar"} size={18} style={{marginBottom: -6, color: colors.appFirstColor}}/>
                        <Text style={[localStyles.itemText, {marginTop: 5}]}>{new Date(item.purchaseDate).toLocaleDateString()}</Text>
                    </View>

                    {(typeId && reliefId) && (
                        <Text style={localStyles.itemText}>
                            Bilet {typeId?.type}{"\n"}
                            <Text style={stylesApp.boldText}>{reliefId.name}</Text>{"\n"}
                            na {typeId?.lines} linię
                        </Text>
                    )}

                </View>
                <View style={localStyles.ticketItemButton}>
                    <Text style={{color: colors.appWhite, fontWeight: "bold"}}>Skasuj</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const handleFinish = () => {
        // setActiveTickets(false);
    };


    const renderActiveTicketItem = ( {item} : {item: TicketOrderTransaction} ) => {

        const typeId = ticketsData.find(type => type._id === item.ticketTypeId);
        const reliefId = reliefs.find(relief => relief._id === item.discountId);

        return (
            <TouchableOpacity onPress={() => handleTicketDetails(item)} style={{marginBottom: 10}}>
                <View style={localStyles.activeItem}>
                    <View style={localStyles.dataActiveItem}>
                        <Mci  name={"timeline-clock"} size={60} style={{marginBottom: -6, color: colors.greenText}}/>

                    {(typeId && reliefId) && (
                        <Text style={localStyles.activeItemText}>
                            <Text style={stylesApp.boldText}>Bilet {typeId?.type} {reliefId.name}</Text>{"\n"}
                            na {typeId?.lines} linię
                        </Text>
                    )}
                    </View>
                    <CountdownProgressBar duration={typeId?.type === "jednorazowy" ? (1000 * 60) : (1000 * 60 * 24)} onFinish={handleFinish} />

                </View>

            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={stylesApp.scrollContainer}>

            <View style={stylesApp.container}>
                <View style={localStyles.headerItems}>
                    <Text style={localStyles.h2Header}>Cześć, {user?.firstName}</Text>
                </View>


                {activeTickets && (
                    <View style={stylesApp.contentBox}>
                        <View style={stylesApp.divider} />

                        <Text style={stylesApp.normalH3}>Aktywne bilety</Text>

                        <FlatList
                            data={filteredActiveTicketsForValidation}
                            renderItem={renderActiveTicketItem}
                            keyExtractor={(item) => item.number}
                            scrollEnabled={false}
                        />
                    </View>
                )}

                <View style={stylesApp.divider} />

                <Text style={stylesApp.normalH3}>Co chcesz zrobić?</Text>

                <View>
                    <TouchableOpacity style={localStyles.itemHorizontal} onPress={() => navigation.navigate("UserPanel", {screen: "Tickets"})}>
                        <Mci name="ticket-confirmation" size={30} color={colors.appWhite} />
                        <Text style={localStyles.ticketItemText}>Twoje bilety</Text>
                    </TouchableOpacity>

                    <View style={localStyles.itemsBox}>
                        <TouchableOpacity style={localStyles.itemVertical} onPress={() => navigation.navigate("UserPanel", {screen: "Wallet"})}>
                            <Entypo name="wallet" size={24} color={colors.textColorBlack} />
                            <Text style={localStyles.itemText}>Portfel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={localStyles.itemVertical} onPress={() => navigation.navigate("UserPanel", {screen: "Tickets"})}>
                            <Icon name="star" size={24} color={colors.textColorBlack} />
                            <Text style={localStyles.itemText}>Ulubione bilety</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {forValidation && (
                    <View style={stylesApp.contentBox}>
                        <View style={[stylesApp.divider, {marginVertical: 7}]} />

                        <Text style={stylesApp.normalH3}>Chcesz skasować bilet?</Text>

                        <FlatList
                            data={filteredTicketsForValidation}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.number}
                            horizontal={true}
                        />
                    </View>
                )}


            </View>

        </ScrollView>
    )
};

const localStyles = StyleSheet.create({
    headerItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingBottom: 5,
    },
    h2Header: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: 25,
        fontWeight: 'bold',
    },
    itemHorizontal: {
        flexDirection: "row",
        marginLeft: 2,
        paddingHorizontal: 25,
        paddingVertical: 35,
        marginVertical: 5,
        backgroundColor: colors.appFirstColor,
        borderRadius: dimensions.radius,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    itemVertical: {
        flexDirection: "column",
        marginLeft: 2,
        paddingHorizontal: 25,
        paddingVertical: 25,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: dimensions.radius,
        gap: 5,
        alignItems: "center",
        flex: 1,
    },
    activeItem: {
        marginLeft: 2,
        paddingHorizontal: 18,
        paddingVertical: 15,
        marginVertical: 5,
        backgroundColor: colors.bgGreen,
        borderRadius: dimensions.radius,
        gap: 15,
        zIndex: 0,
    },
    dataActiveItem: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    itemText: {
        fontSize: 13,
        color: colors.textColorBlack,
        textAlign: "center",
    },
    activeItemText: {
        fontSize: 16,
        color: colors.textColorBlack,
        textAlign: "left",
    },
    ticketItemText: {
        fontSize: 20,
        color: colors.appWhite,
        fontWeight: "bold",
        textAlign: "center",
    },
    itemsBox: {
        gap: 10,
        flexDirection: "row",
    },
    dateBox: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    ticketItemHorizontal: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        gap: 10,
        backgroundColor: colors.appThirdColor,
        borderTopStartRadius: dimensions.radius,
        borderTopEndRadius: dimensions.radius,
    },

    ticketItemButton: {
        alignItems: "center",
        backgroundColor: colors.appFirstColor,
        borderBottomEndRadius: dimensions.radius,
        borderBottomStartRadius: dimensions.radius,
        paddingVertical: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#76c7c0', // Kolor paska postępu
    },
});

export default Home;
