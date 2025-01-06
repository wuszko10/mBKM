import React,{ SetStateAction } from "react";
import { FlatList,SafeAreaView,Text,TouchableOpacity } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { Ticket } from "../../types/interfaces.tsx";
import {SEASON_TICKET, SINGLE_TICKET} from "../../../variables.tsx";
import style from "./style.tsx";

type TicketAndReliefTypeSelectorProps = {
    ticketsData: Ticket[];
    setSelectedTicket: React.Dispatch<SetStateAction<Ticket | null>>;
    selectedTicketId: string | null;
    setSelectedTicketId: React.Dispatch<React.SetStateAction<string | null>>;
    ticketType: 'single' | 'season' | null;
};
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
    };

    return (
        <SafeAreaView>
            <FlatList
                scrollEnabled={false}
                data={filteredTickets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleTicketSelect(item)} style={[
                        stylesApp.flatlistItem,
                        props.selectedTicketId === item._id && style.selectedItem
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

export default TicketTypeSelector

