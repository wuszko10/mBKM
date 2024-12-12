import React from "react";
import { SafeAreaView,ScrollView,Text,TouchableOpacity,View } from "react-native";
import Header from "../../components/Global/Header.tsx";
import stylesApp from "../../style/stylesApp.js";
import TicketSelector from "../../components/Tickets/TicketSelector.tsx";
import TicketTypeSelector from "../../components/Tickets/TicketTypeSelector.tsx";
import { useNavigation } from "@react-navigation/native";
import {useBuyTicketSelectionLogic} from "../../hooks/BuyTicket/useBuyTicketSelectionLogic.tsx";
import {NavigationProp} from "../../types/navigation.tsx";

const BuyTicketSelection = () => {

    const navigation = useNavigation<NavigationProp>();

    const {
        selectedTicket,
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        ticketType,
        toggleTicketType,
        ticketsData,
        resetData,
    } = useBuyTicketSelectionLogic();

    const handleConfiguration= () => {
        if (selectedTicket !== null && selectedTicketId !== null) {
            navigation.navigate('BuyTicketConfiguration', {
                selectedTicket: selectedTicket
            });
            resetData();
        } else {
            console.log('Brak wystarczających danych do podsumowania transakcji.');
        }
    }

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

                            <View style={stylesApp.summaryBox}>
                                <TouchableOpacity onPress={handleConfiguration} style={stylesApp.mainButton}>
                                    <Text style={stylesApp.whiteBoldCenterText}>Kup bilet</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ) : (
                        <View style={stylesApp.summaryBox}>
                            <Text style={stylesApp.whiteBoldCenterText}>Brak biletów</Text>
                        </View>
                    )}

                </View>


            </SafeAreaView>
        </ScrollView>
    );

};

export default BuyTicketSelection;
