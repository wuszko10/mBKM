import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../style/styleValues";
import stylesApp from "../../style/stylesApp.js";

export default StyleSheet.create({

    h2: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: 40,
        fontWeight: 'bold',
    },


    loginRegisterContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.appBg,
        paddingRight: dimensions.appPadding,
        paddingLeft: dimensions.appPadding,
        paddingTop: 3*dimensions.appPadding,
        paddingBottom: 3*dimensions.appPadding,
        justifyContent: 'center',
        gap: dimensions.itemGapBig,
    },

    gapContainer: {
        display: 'flex',
        gap: dimensions.inputGap,
    },


    grayText: {
        color: colors.darkGray,
        textAlign: 'right',
        paddingTop: 5,
        paddingRight: dimensions.inputPadding,
        fontSize: dimensions.smallTextSize,
    },

    lr_bottomText: {
        color: colors.darkGray,
        textAlign: 'center',
        fontSize: dimensions.smallTextSize,
    },

    highlightText: {
        color: colors.appFirstColor,
    },

    changeButton: {
        ...stylesApp.flatlistItem,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }

})
