import { StyleSheet } from "react-native";
import { colors,dimensions } from "../../style/styleValues.js";

export const style = StyleSheet.create({
    balanceContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.appBg,
        borderRadius: dimensions.inputRadius,
    },

    balanceText:{
        color: colors.appFirstColor,
        fontSize: 40,
        fontWeight: 'bold',
    },

    transactionContainer: {
        marginTop: dimensions.appNormalPadding,
        paddingLeft: 15,
    },

    item: {
        marginLeft: 2,
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: 10
    },

    text: {
        fontSize: 16,
        color: colors.textColorBlack,
    },
    topUpBox: {
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});
