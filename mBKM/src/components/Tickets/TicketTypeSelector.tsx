import React,{ SetStateAction,useState } from "react";
import { FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { colors,dimensions } from "../../style/styleValues.js";
import stylesApp from "../../style/stylesApp.js";
import DropDownPicker from "react-native-dropdown-picker";
import { reliefs,lines,ticketsData } from "../../repositories/Data.tsx";
import { Ticket } from "../../repositories/interfaces.tsx";
import {TicketAndReliefTypeSelectorProps} from "../../types/componentProps.tsx";


const TicketTypeSelector: React.FC<TicketAndReliefTypeSelectorProps> = (props) => {


    const filteredTickets = ticketsData.filter((ticket) => {
        if (props.ticketType === 'single' && ticket.type === 'jednorazowy') {
            return true;
        } else if (props.ticketType === 'season' && ticket.type === 'okresowy') {
            return true;
        }
        return false;
    });

    const handleTicketSelect = (ticket: Ticket) => {
        props.setSelectedTicket(ticket);
        props.setSelectedTicketId(ticket._id);
        props.setNumberSelectedLines(ticket.lines);

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
                        props.selectedTicketId === item._id && localStyle.selectedItem
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

