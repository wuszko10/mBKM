import { Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import React from "react";
import style from "./style.tsx";

type TicketSelectorProps = {
    ticketType: 'single' | 'season' | null;
    toggleTicketType: (type: 'single' | 'season') => void;
}
const TicketSelector: React.FC<TicketSelectorProps> = (props) => {

    return(
        <View style={stylesApp.contentBox}>
            <Text style={stylesApp.normalH3}>Wybierz rodzaj biletu</Text>
            <View style={style.buttonBox}>
                <TouchableOpacity
                    onPress={() => props.toggleTicketType('single')}
                    style={[
                        style.ticketItem,
                        props.ticketType === 'single'?{ backgroundColor: colors.appFirstColor }:{ backgroundColor: colors.appThirdColor }
                    ]}>
                    <Text style={props.ticketType === 'single'?{ color: colors.appWhite }:{ color: colors.textColorBlack }}>Bilet
                        jednorazowy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.toggleTicketType('season')} style={[
                    style.ticketItem,
                    props.ticketType === 'season'?{ backgroundColor: colors.appFirstColor }:{ backgroundColor: colors.appThirdColor }
                ]}>
                    <Text style={props.ticketType === 'season'?{ color: colors.appWhite }:{ color: colors.textColorBlack }}>Bilet
                        okresowy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default TicketSelector;
