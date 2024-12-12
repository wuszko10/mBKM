import React from "react";
import { FlatList,SafeAreaView,StyleSheet,Text,TouchableOpacity } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { Ticket } from "../../types/interfaces.tsx";
import {TicketAndReliefTypeSelectorProps} from "../../types/componentProps.tsx";
import {SEASON_TICKET, SINGLE_TICKET} from "../../repositories/variables.tsx";


const TicketTypeSelector: React.FC<TicketAndReliefTypeSelectorProps> = (props) => {

    const filteredTickets = props.ticketsData.filter((ticket) => {
        if (props.ticketType === SINGLE_TICKET && ticket.typeName === SINGLE_TICKET) {
            return true;
        } else if (props.ticketType === SEASON_TICKET && ticket.typeName === SEASON_TICKET) {
            return true;
        }
        return false;
    });

    const handleTicketSelect = (ticket: Ticket) => {
        props.setSelectedTicket(ticket);
        props.setSelectedTicketId(ticket._id);
        props.setNumberSelectedLines(ticket.lineName);

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
                        <Text style={stylesApp.itemText}>Bilet <Text style={stylesApp.boldText}>{item.typeLabel}</Text></Text>
                        <Text style={stylesApp.itemText}>Linie: <Text style={stylesApp.boldText}>{item.lineLabel}</Text></Text>
                        {item.period != null ? (<Text style={stylesApp.itemText}>Okres: <Text style={stylesApp.boldText}>{item.periodLabel}</Text></Text>) : null}
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

