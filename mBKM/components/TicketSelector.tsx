import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../style/stylesApp.js";
import { colors,dimensions } from "../style/styleValues.js";
import React from "react";

type TicketSelectorProps = {
    singleTicket: boolean;
    seasonTicket: boolean;
    handleSingleTicket: () => void;
    handleSeasonTicket: () => void;
};

const TicketSelector: React.FC<TicketSelectorProps> = (
    {
        singleTicket,
        seasonTicket,
        handleSingleTicket,
        handleSeasonTicket,
    }) => {

    return(
        <View style={stylesApp.contentBox}>
            <Text style={stylesApp.normalH3}>Wybierz rodzaj biletu</Text>
            <View style={localStyle.buttonBox}>
                <TouchableOpacity
                    onPress={handleSingleTicket}
                    style={[
                        localStyle.ticketItem,
                        singleTicket?{ backgroundColor: colors.appFirstColor }:{ backgroundColor: colors.appThirdColor }
                    ]}>
                    <Text style={singleTicket?{ color: colors.appWhite }:{ color: colors.textColorBlack }}>Bilet
                        jednorazowy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSeasonTicket} style={[
                    localStyle.ticketItem,
                    seasonTicket?{ backgroundColor: colors.appFirstColor }:{ backgroundColor: colors.appThirdColor }
                ]}>
                    <Text style={seasonTicket?{ color: colors.appWhite }:{ color: colors.textColorBlack }}>Bilet
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
