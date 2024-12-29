import React from "react";
import { Relief,Ticket,UserTicket } from "../../types/interfaces.tsx";
import stylesApp from "../../style/stylesApp.js";
import { FlatList,Text,TouchableOpacity,View } from "react-native";
import { style as localStyles } from "../../screens/Home/style.tsx";
import Foundation from "react-native-vector-icons/Foundation";
import { colors } from "../../style/styleValues.js";

type ComponentProps = {
    toValidateTickets: UserTicket[] | undefined;
    tickets: Ticket[] | undefined;
    reliefs: Relief[] | undefined;
    handleTicketDetails: (id: string) => void;
    handleValidateTicket: (id: string) => void;
    setForValidation: (forValidation: boolean) => void;
}
const ToValidateTicketComponent: React.FC<ComponentProps> = (props) => {

    const renderItem= ({item} : {item: UserTicket}) => {

        const ticketType = props.tickets && (props.tickets.find(type => type._id === item.ticketId));
        const reliefType = props.reliefs && (props.reliefs.find(r => r._id === item.reliefId))
        return (
            <View style={{marginHorizontal: 5, marginVertical: 10}}>
                <TouchableOpacity onPress={() => props.handleTicketDetails(item.id)}>
                    <View style={localStyles.ticketItemHorizontal}>
                        <View style={localStyles.dateBox}>
                            <Foundation  name={"calendar"} size={18} style={{marginBottom: -6, color: colors.appFirstColor}}/>
                            <Text style={[localStyles.itemText, {marginTop: 5}]}>{new Date(item.purchaseDate).toLocaleDateString()}</Text>
                        </View>

                        <Text style={localStyles.itemText}>
                            Bilet {ticketType?.typeLabel}{"\n"}
                            <Text style={stylesApp.boldText}>{reliefType?.name}</Text>{"\n"}
                            na {ticketType?.lineLabel}
                        </Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.handleValidateTicket(item.id)}>
                    <View style={localStyles.ticketItemButton}>
                        <Text style={{color: colors.appWhite, fontWeight: "bold"}}>Skasuj</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    return(
        <View style={stylesApp.contentBox}>
            <View style={[stylesApp.divider, {marginVertical: 7}]} />

            <Text style={stylesApp.normalH3}>Chcesz skasować bilet?</Text>

            <FlatList
                data={props.toValidateTickets}
                renderItem={renderItem}
                keyExtractor={(item) => item.number}
                horizontal={true}
            />
        </View>
    )
}

export default ToValidateTicketComponent;
