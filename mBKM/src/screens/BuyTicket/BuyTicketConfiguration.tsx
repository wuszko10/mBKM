import React from "react";
import { ActivityIndicator,SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import Header from "../../components/Global/Header.tsx";
import stylesApp from "../../style/stylesApp.js";
import DateSelector from "../../components/Tickets/DateSelector.tsx";
import DropdownSelector from "../../components/Tickets/DropdownSelector.tsx";
import { Ticket } from "../../types/interfaces.tsx";
import { useRoute } from "@react-navigation/native";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import {ONE_LINE, SEASON_TICKET} from "../../../variables.tsx";
import {useBuyTicketConfigurationLogic} from "../../hooks/BuyTicket/useBuyTicketConfigurationLogic.tsx";
import { colors } from "../../style/styleValues.js";

type RouteParams = {
    selectedTicket: Ticket;
}
const BuyTicketConfiguration = () => {

    const route = useRoute();
    const {selectedTicket} = route.params as RouteParams;


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
        handleSummaryPurchase,
    } = useBuyTicketConfigurationLogic(selectedTicket)



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

            <View>
                {isLoading?(
                    <View style={stylesApp.contentBox}>
                        <ActivityIndicator size="large" color={colors.appFirstColor} />
                    </View>
                ):(

                    <View style={stylesApp.contentBox}>
                        {selectedTicket.typeName === SEASON_TICKET && (
                            <DateSelector
                                showDate={showDate}
                                setShowDate={setShowDate}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate} />
                        )}

                        {selectedTicket.lineName === ONE_LINE && (
                            <DropdownSelector
                                selectedValue={selectedLines}
                                setSelectedValue={setSelectedLines}
                                data={linesData}
                                placeholder="Wybierz linię"
                            />
                        )}

                        <DropdownSelector
                            selectedValue={selectedRelief}
                            setSelectedValue={setSelectedRelief}
                            data={reliefsData}
                            placeholder="Wybierz ulgę"
                        />
                    </View>
                )}
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

export default BuyTicketConfiguration;
