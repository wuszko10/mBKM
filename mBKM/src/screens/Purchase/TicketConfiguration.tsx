import React, {useEffect, useState} from "react";
import { SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import Header from "../../components/Global/Header.tsx";
import stylesApp from "../../style/stylesApp.js";
import DateSelector from "../../components/Tickets/DateSelector.tsx";
import DropdownSelector from "../../components/Tickets/DropdownSelector.tsx";
import { Ticket } from "../../types/interfaces.tsx";
import { useNavigation,useRoute } from "@react-navigation/native";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import {NavigationProp} from "../../types/navigation.tsx";
import {ALL_LINES, ONE_LINE, SEASON_TICKET, SINGLE_TICKET} from "../../repositories/variables.tsx";
import {useTicketConfigurationLogic} from "../../hooks/Purchase/useTicketConfigurationLogic.tsx";

type RouteParams = {
    selectedTicket: Ticket;
    ticketType: string;
    numberSelectedLines: string;
}
const TicketConfiguration = () => {

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {selectedTicket,ticketType, numberSelectedLines} = route.params as RouteParams;


    const {
        showDate,
        isLoading,
        reliefsData,
        linesData,
        selectedDate,
        selectedLines,
        selectedRelief,
        finalPrice,
        setShowDate,
        setSelectedDate,
        setSelectedRelief,
        setSelectedLines,
    } = useTicketConfigurationLogic(selectedTicket)

    const handleSummaryPurchase = () => {
        if (selectedRelief) {
            const summaryParams = {
                selectedTicket,
                selectedLines: selectedTicket.lines,
                selectedRelief: selectedRelief || "",
                ...(showDate && { selectedDate: selectedDate.toISOString() }),
                finalPrice,
            };
            navigation.navigate("TicketSummary", summaryParams);
        } else {
            console.log("Uzupełnij wszystkie pola");
        }
    };

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Koszyk" />

            <Text style={stylesApp.normalH3}>Wybrany bilet</Text>
            <View style={stylesApp.ticketBox}>
                <Mci name={"bus-stop"} size={50} style={stylesApp.ticketIcon}/>
                <View>
                    <Text style={stylesApp.itemText}>Bilet {selectedTicket.typeLabel}</Text>
                    <Text style={stylesApp.itemText}>{ selectedTicket.period ? ( `${selectedTicket.periodLabel}, ` ) : ( "Na " )} { selectedTicket.lineLabel } </Text>
                </View>
            </View>

            <View style={stylesApp.separator} />
            <Text style={stylesApp.normalH3}>Konfiguruj bilet</Text>

            <View style={stylesApp.contentBox}>

                { ticketType === SEASON_TICKET && (
                        <DateSelector
                            showDate={showDate}
                            setShowDate={setShowDate}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}/>
                )}

                { numberSelectedLines === ONE_LINE && (
                    <DropdownSelector
                        loading={isLoading}
                        selectedValue={selectedLines}
                        setSelectedValue={setSelectedLines}
                        data={linesData}
                        placeholder="Wybierz linię"
                    />
                )}

                <DropdownSelector
                    loading={isLoading}
                    selectedValue={selectedRelief}
                    setSelectedValue={setSelectedRelief}
                    data={reliefsData}
                    placeholder="Wybierz ulgę"
                />


            </View>

                <View style={stylesApp.summaryBox}>
                    <Text style={stylesApp.finalPrice}>Cena biletu: <Text
                        style={stylesApp.boldText}>{finalPrice.toFixed(2)} zł</Text></Text>

                    <TouchableOpacity onPress={handleSummaryPurchase} style={stylesApp.mainButton}>
                        <Text style={stylesApp.whiteBoldCenterText}>Podsumowanie transakcji</Text>
                    </TouchableOpacity>
                </View>


        </SafeAreaView>
    );
};

export default TicketConfiguration;
