import { StyleSheet } from "react-native";
import { colors,dimensions } from "../../style/styleValues.js";

export const style = StyleSheet.create({

    headerItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingBottom: 5,
    },
    h2Header: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: 25,
        fontWeight: 'bold',
    },
    itemHorizontal: {
        flexDirection: "row",
        marginLeft: 2,
        paddingHorizontal: 25,
        paddingVertical: 35,
        marginVertical: 5,
        backgroundColor: colors.appFirstColor,
        borderRadius: dimensions.radius,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    itemVertical: {
        flexDirection: "column",
        marginLeft: 2,
        paddingHorizontal: 25,
        paddingVertical: 25,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: dimensions.radius,
        gap: 5,
        alignItems: "center",
        flex: 1,
    },
    activeItem: {
        marginLeft: 2,
        paddingHorizontal: 18,
        paddingVertical: 15,
        marginVertical: 5,
        backgroundColor: colors.bgGreen,
        borderRadius: dimensions.radius,
        gap: 15,
        zIndex: 0,
    },
    dataActiveItem: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: -6,
    },
    itemText: {
        fontSize: 13,
        color: colors.textColorBlack,
        textAlign: "center",
    },
    activeItemText: {
        fontSize: 16,
        color: colors.textColorBlack,
        textAlign: "left",
    },
    ticketItemText: {
        fontSize: 20,
        color: colors.appWhite,
        fontWeight: "bold",
        textAlign: "center",
    },
    itemsBox: {
        gap: 10,
        flexDirection: "row",
    },
    dateBox: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    ticketItemHorizontal: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        gap: 10,
        backgroundColor: colors.appThirdColor,
        borderTopStartRadius: dimensions.radius,
        borderTopEndRadius: dimensions.radius,
    },

    ticketItemButton: {
        alignItems: "center",
        backgroundColor: colors.appFirstColor,
        borderBottomEndRadius: dimensions.radius,
        borderBottomStartRadius: dimensions.radius,
        paddingVertical: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#76c7c0', // Kolor paska postępu
    },
});
