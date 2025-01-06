import stylesApp from "../../style/stylesApp.js";
import { FlatList,Text,TouchableOpacity,View } from "react-native";
import React,{ Dispatch,SetStateAction } from "react";
import { Line,Relief,Ticket,UserTicket } from "../../types/interfaces.tsx";
import { style as localStyles } from "../../screens/Home/style.tsx";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../style/styleValues.js";
import Timer from "../Global/Timer/Timer.tsx";
import { ALL_LINES } from "../../../variables.tsx";

type ComponentProps = {
    validateTickets: UserTicket[] | undefined;
    tickets: Ticket[] | undefined;
    reliefs: Relief[] | undefined;
    lines: Line[] | undefined;
    handleTicketDetails: (id: string) => void;
    setActiveTickets: Dispatch<SetStateAction<boolean>>;
}

const ActiveTicketsComponent: React.FC<ComponentProps> = (props) => {

    const handleFinish = () => {
        props.setActiveTickets(false);
    };

    const renderActiveTicketItem = ( {item} : {item: UserTicket} ) => {

        const ticketType = props.tickets && (props.tickets.find(type => type._id === item.ticketId));
        const reliefType = props.reliefs && (props.reliefs.find(r => r._id === item.reliefId))
        const line = (props.lines) && (props.lines.find(l => l.id === item.lineId));

        return (
            <TouchableOpacity onPress={() => props.handleTicketDetails(item.id)} style={{marginBottom: 10}}>
                <View style={localStyles.activeItem}>
                    <View style={localStyles.dataActiveItem}>
                        <Mci  name={"timeline-clock"} size={60} style={{color: colors.greenText}}/>

                        <Text style={localStyles.activeItemText}>
                            <Text style={stylesApp.boldText}>Bilet {ticketType?.typeLabel} {reliefType?.name}</Text>{"\n"}
                            {ticketType?.lineLabel}{line?.number !== ALL_LINES && (" – " + line?.name)}
                        </Text>

                    </View>
                    <Timer
                        startTime={item?.ticketStartDate}
                        endTime={item?.ticketEndDate}
                        type={ticketType?.typeName}
                        onFinish={handleFinish}
                        setActiveTickets={props.setActiveTickets}
                    />

                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={stylesApp.contentBox}>
            <View style={stylesApp.divider} />

            <Text style={stylesApp.normalH3}>Aktywne bilety</Text>

            <FlatList
                data={props.validateTickets}
                renderItem={renderActiveTicketItem}
                keyExtractor={(item) => item.number}
                scrollEnabled={false}
            />
        </View>
    )
}

export default ActiveTicketsComponent;
