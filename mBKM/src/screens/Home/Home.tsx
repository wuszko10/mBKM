import React from "react";
import { ActivityIndicator,ScrollView,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.tsx";
import { colors } from "../../style/styleValues.js";
import Entypo from "react-native-vector-icons/Entypo";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import { useHomeLogic } from "../../hooks/Home/useHomeLogic.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { style as localStyles } from "./style.tsx";
import ActiveTicketsComponent from "../../components/Home/ActiveTicketsComponent.tsx";
import ToValidateTicketComponent from "../../components/Home/ToValidateTicketComponent.tsx";

const Home = () => {

    const navigation = useNavigation<NavigationProp>();
    const { user, token, userId} = useAuth();

    const {
        forValidation,
        activeTickets,
        setActiveTickets,
        setForValidation,
        toValidateTickets,
        validateTickets,
        reliefs,
        tickets ,
        lines,
        handleTicketDetails,
        handleValidateTicket,
        isLoading
    } = useHomeLogic(token, userId);

    if (isLoading) {
        return (
            <View style={stylesApp.container}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
    }

    return (
        <ScrollView style={stylesApp.scrollContainer}>

            <View style={stylesApp.container}>
                <View style={localStyles.headerItems}>
                    <Text style={localStyles.h2Header}>Cześć, {user?.firstName}</Text>
                </View>


                {(!isLoading && activeTickets) && (
                    <ActiveTicketsComponent
                        validateTickets={validateTickets}
                        tickets={tickets}
                        reliefs={reliefs}
                        lines={lines}
                        handleTicketDetails={handleTicketDetails}
                        setActiveTickets={setActiveTickets}
                    />

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
                        <TouchableOpacity style={localStyles.itemVertical} onPress={() => navigation.navigate("BuyTicketSelection")}>
                            <Entypo name="plus" size={24} color={colors.textColorBlack} />
                            <Text style={localStyles.itemText}>Kup bilet</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {(!isLoading && forValidation) && (
                    <ToValidateTicketComponent
                        toValidateTickets={toValidateTickets}
                        tickets={tickets}
                        reliefs={reliefs}
                        lines={lines}
                        handleTicketDetails={handleTicketDetails}
                        handleValidateTicket={handleValidateTicket}
                        setForValidation={setForValidation}
                    />
                )}


            </View>

        </ScrollView>
    )
};


export default Home;
