import React from "react";
import { SafeAreaView,ScrollView,Text,TouchableOpacity,View } from "react-native";
import Header from "../../components/Global/Header/Header.tsx";
import stylesApp from "../../style/appStyle.js";
import TicketSelector from "../../components/Tickets/TicketSelector.tsx";
import TicketTypeSelector from "../../components/Tickets/TicketTypeSelector.tsx";
import {useBuyTicketSelectionLogic} from "../../hooks/BuyTicket/useBuyTicketSelectionLogic.tsx";
import style from "./style.tsx";

const BuyTicketSelection = () => {

    const {
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        ticketType,
        toggleTicketType,
        ticketsData,
        handleConfiguration,
    } = useBuyTicketSelectionLogic();



    return (
        <ScrollView style={stylesApp.scrollContainer}>
            <SafeAreaView style={stylesApp.container}>

                <Header title="Kup bilet" />

                <View style={stylesApp.contentBox}>

                    <TicketSelector
                        ticketType={ticketType}
                        toggleTicketType={toggleTicketType}
                    />

                    { (ticketType && ticketsData ) ? (
                        <View>
                            <TicketTypeSelector
                                ticketsData={ticketsData}
                                setSelectedTicket={setSelectedTicket}
                                selectedTicketId={selectedTicketId}
                                setSelectedTicketId={setSelectedTicketId}
                                ticketType={ticketType}
                            />

                            <View style={style.summaryBox}>
                                <TouchableOpacity onPress={handleConfiguration} style={stylesApp.mainButton}>
                                    <Text style={stylesApp.whiteBoldCenterText}>Kup bilet</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ) : (
                        <View style={style.summaryBox}>
                            <Text style={stylesApp.whiteBoldCenterText}>Brak biletów</Text>
                        </View>
                    )}

                </View>


            </SafeAreaView>
        </ScrollView>
    );

};

export default BuyTicketSelection;
