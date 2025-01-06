import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../style/styleValues";

export default StyleSheet.create({

    buttonsContainer: {
        flexDirection: "column",
        gap: 20,
        alignItems: "stretch",
        justifyContent: "center",
    },

    popupBtn: {
        backgroundColor: colors.appWhite,
        borderRadius: dimensions.radius,
        paddingVertical: 10,
    },

    secPopupBtn: {
        backgroundColor: 'transparent',
        borderRadius: dimensions.radius,
    },

    inputsContainer: {
        display: 'flex',
        gap: dimensions.inputGap,
    },

    popupText: {
        textAlign: "center",
        fontSize: dimensions.hugeTextSize,
        fontWeight: "bold",
        color: colors.appWhite,
    }

})
