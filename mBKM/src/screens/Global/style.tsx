import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../style/styleValues";

export default StyleSheet.create({


    h1: {
        color: colors.appFirstColor,
        textAlign: 'center',
        fontSize: 80,
        fontWeight: 'bold',
    },

    bigSeparator: {
        height: 200,
    },

    welcomeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.appBg,
        padding: dimensions.appPadding,
        justifyContent: 'flex-end',
    },

    welcomeButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 60,
        gap: dimensions.itemGap,
    },


    secondButton: {
        backgroundColor: '#95C5E1' ,
        borderRadius: dimensions.buttonRadius,
        padding: dimensions.buttonPadding,
    },


    blueNormalCenterText: {
        color: colors.appFirstColor,
        textAlign: 'center',
        fontSize: dimensions.normalTextSize,
    },

})
