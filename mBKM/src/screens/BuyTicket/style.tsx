import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../style/styleValues";

export default StyleSheet.create({

    ticketBoxSummary: {
        backgroundColor: colors.appThirdColor,
        padding: dimensions.appNormalPadding,
        borderRadius: dimensions.radius,
        gap: 10,
        flexDirection: "row"
    },


    ticketBoxConfiguration: {
        backgroundColor: colors.appThirdColor,
        borderRadius: dimensions.radius,
        gap: dimensions.appNormalPadding+10,
        flexDirection: "row",
        alignItems: "center"
    },

    leftBox: {
        flexGrow: 0.1,
        flexShrink: 0.1,
    },

    rightBox: {
        flexGrow: 0.9,
        flexShrink: 0.9,
    },

    textRight: {
        textAlign: "right",
        fontSize: 15,
        color: colors.darkGray,
    },

    textLeft: {
        color: colors.textColorBlack,
        fontWeight: "bold",
        fontSize: 15,
    },

    summaryBox:{
        marginVertical: 45,
        bottom: 10,
        alignItems: "center",
        gap: 12,
    },

    ticketIcon: {
        padding: dimensions.appNormalPadding,
        color: colors.appWhite,
        backgroundColor: colors.appFirstColor,
        borderRadius: dimensions.radius,
    },


    finalPrice: {
        color: colors.textColorBlack,
        fontSize: dimensions.largeTextSize,
    },

})
