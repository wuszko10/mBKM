import { StyleSheet } from "react-native";
import { colors,dimensions } from "../../../style/styleValues.js";

export const style = StyleSheet.create({
    ticketBox: {
        backgroundColor: colors.appThirdColor,
        padding: dimensions.appNormalPadding,
        borderRadius: dimensions.radius,
        gap: 10,
        flexDirection: "row"
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
    }
});
