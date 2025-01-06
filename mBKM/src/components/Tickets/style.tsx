import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../style/styleValues";

export default StyleSheet.create({

    labelInputText: {
        color: colors.textColorBlack,
        paddingLeft: 10,
        fontSize: dimensions.smallTextSize,
    },

    inputBoxSelector: {
        gap: 5,
    },

    dropdown: {
        backgroundColor: colors.appThirdColor,
        borderWidth: 0,
        borderRadius: dimensions.radius,
        zIndex: 10,
    },
    dropdownContainer: {
        backgroundColor: colors.lightBlue,
        borderWidth: 0,
        marginTop: 4,
        padding: 5,
    },
    inputBox: {
        gap: 5,
    },
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
    selectedItem: {
        backgroundColor: '#b0e0ff',
    },
})
