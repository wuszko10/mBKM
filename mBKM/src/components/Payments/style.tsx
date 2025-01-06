import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../style/styleValues";
import stylesApp from "../../style/stylesApp.js";

export default StyleSheet.create({

    inputBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
    },
    inputText: {
        flex: 1,
        textAlign: "left",
        borderRadius: dimensions.radius,
        paddingLeft: 10,
    },
    text: {
        ...stylesApp.whiteNormalCenterText,
        width: 56,
        fontSize: 13,
        textAlign: "right",
    },
    paymentBox: {
        flexDirection: "column",
        gap: dimensions.itemGap,
        alignSelf: "stretch",
    },
    box: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    methodBox: {
        flexGrow: 0.5,
        flexShrink: 0.5,
        flexBasis: 100,
        height: 80,
        gap: 4,
        borderRadius: dimensions.radius,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.appThirdColor,
    },


    rowContainerPayment: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        alignSelf: "center"
    },
})
