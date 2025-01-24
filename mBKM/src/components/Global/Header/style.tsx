import { StyleSheet } from "react-native";
import { colors } from "../../../style/styleValues";

export default StyleSheet.create({

    h2Title: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
    },

    headerItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingBottom: 15,
    },

    backIconBox:{
        height: 30,
        width: 30,
        alignItems: "center",
    },

    icon: {
        marginTop: -3,
        color: colors.appFirstColor,
    },

})
