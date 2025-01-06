import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../style/styleValues";

export default StyleSheet.create({

    userTicketContainer: {
        backgroundColor: colors.lightBlue,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        gap: dimensions.itemGapBig,
        borderRadius: dimensions.radius,
    },

    smallGapContainer: {
        display: 'flex',
        gap: dimensions.itemGapSmall,
    },

    ticketTypeText: {
        color: colors.appFirstColor,
        fontWeight: "bold",
        fontSize: 20,
    },

    addButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        position: "absolute",
        backgroundColor: colors.appBg,
        borderRadius: 100,
        paddingRight: 15,
        bottom: 25,
        right: 25,
        zIndex: 10,
    },

    icon: {
        color: colors.appWhite,
        backgroundColor: colors.appFirstColor,
        padding: 10,
        borderRadius: 100,
    },

    buyTicketText: {
        color: colors.appFirstColor,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        paddingHorizontal: 6,
    },
})
