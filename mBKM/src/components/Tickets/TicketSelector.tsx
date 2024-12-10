import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors,dimensions } from "../../style/styleValues.js";
import React from "react";
import {TicketSelectorProps} from "../../types/componentProps.tsx";

const TicketSelector: React.FC<TicketSelectorProps> = (props) => {

    return(
        <View style={stylesApp.contentBox}>
            <Text style={stylesApp.normalH3}>Wybierz rodzaj biletu</Text>
            <View style={localStyle.buttonBox}>
                <TouchableOpacity
                    onPress={() => props.toggleTicketType('single')}
                    style={[
                        localStyle.ticketItem,
                        props.ticketType === 'single'?{ backgroundColor: colors.appFirstColor }:{ backgroundColor: colors.appThirdColor }
                    ]}>
                    <Text style={props.ticketType === 'single'?{ color: colors.appWhite }:{ color: colors.textColorBlack }}>Bilet
                        jednorazowy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.toggleTicketType('season')} style={[
                    localStyle.ticketItem,
                    props.ticketType === 'season'?{ backgroundColor: colors.appFirstColor }:{ backgroundColor: colors.appThirdColor }
                ]}>
                    <Text style={props.ticketType === 'season'?{ color: colors.appWhite }:{ color: colors.textColorBlack }}>Bilet
                        okresowy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const localStyle = StyleSheet.create({
    ticketItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: dimensions.radius,
    },
    buttonBox: {
        flexDirection: "row",
        gap: 10,
    },
});

export default TicketSelector;
