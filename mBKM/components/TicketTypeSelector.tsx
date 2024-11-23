import React,{ SetStateAction,useState } from "react";
import { FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { colors,dimensions } from "../style/styleValues.js";
import stylesApp from "../style/stylesApp.js";
import DropDownPicker from "react-native-dropdown-picker";
import { reliefs,lines,ticketsData } from "../repositories/Data.tsx";
import { Ticket } from "../repositories/interfaces.tsx";

type TicketAndReliefTypeSelectorProps = {
    setSelectedTicket: React.Dispatch<SetStateAction<Ticket | null>>;
    selectedTicketId: number | null;
    setSelectedTicketId: React.Dispatch<React.SetStateAction<number | null>>;
    singleTicket: boolean;
    seasonTicket: boolean;
    numberSelectedLines: string | null;
    setNumberSelectedLines: React.Dispatch<React.SetStateAction<string>>;
};
const TicketTypeSelector: React.FC<TicketAndReliefTypeSelectorProps> = (
    {
        setSelectedTicket,
        selectedTicketId,
        setSelectedTicketId,
        singleTicket,
        seasonTicket,
        numberSelectedLines,
        setNumberSelectedLines,
    }) => {


    const filteredTickets = ticketsData.filter((ticket) => {
        if (singleTicket && ticket.type === 'jednorazowy') {
            return true;
        } else if (seasonTicket && ticket.type === 'okresowy') {
            return true;
        }
        return false;
    });

    const handleTicketSelect = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setSelectedTicketId(ticket._id);
        setNumberSelectedLines(ticket.lines);

    };

    return (
        <SafeAreaView>
            <FlatList
                scrollEnabled={false}
                data={filteredTickets}
                keyExtractor={(item) => String(item._id)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleTicketSelect(item)} style={[
                        stylesApp.flatlistItem,
                        selectedTicketId === item._id && localStyle.selectedItem
                    ]}>
                        <Text style={stylesApp.itemText}>Bilet <Text style={stylesApp.boldText}>{item.type}</Text></Text>
                        <Text style={stylesApp.itemText}>Linie: <Text style={stylesApp.boldText}>{item.lines}</Text></Text>
                        {item.period != null ? (<Text style={stylesApp.itemText}>Okres: <Text style={stylesApp.boldText}>{item.period}{item.type === "jednorazowy" ? "-minutowy" : "-miesięczny"}</Text></Text>) : null}
                        <Text style={stylesApp.itemText}>Cena biletu normalnego: <Text style={stylesApp.boldText}>{item.price.toFixed(2)} zł</Text></Text>
                    </TouchableOpacity>
                )}
            />


        </SafeAreaView>
    )

}

const localStyle = StyleSheet.create({
    selectedItem: {
        backgroundColor: '#b0e0ff',
    },


})

export default TicketTypeSelector


/*
<View style={localStyle.summaryBox}>
                <TouchableOpacity onPress={handleSummaryPurchase}  style={stylesApp.mainButton}>
                    <Text style={stylesApp.whiteBoldCenterText}>Podsumowanie transakcji</Text>
                </TouchableOpacity>
            </View>

 */
