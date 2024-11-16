import { StyleSheet } from "react-native";
import { colors, dimensions } from "./styleValues";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.appWhite,
    },


    loginRegisterContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.appBg,
        padding: dimensions.appPadding,
        justifyContent: 'center',
        gap: dimensions.itemGapBig,
    },

    separator: {
        height: dimensions.separator,
    },

    bigSeparator: {
        height: 240,
    },

    gapContainer: {
        display: 'flex',
        gap: dimensions.itemGap,
    },



    /*


    DEFINITIONS STYLES FOR BUTTONS


     */

    welcomeButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 60,
        gap: dimensions.itemGap,
    },

    mainButton: {
        backgroundColor: colors.appFirstColor,
        borderRadius: dimensions.buttonRadius,
        padding: dimensions.buttonPadding,
    },

    secondButton: {
        backgroundColor: '#95C5E1' ,
        borderRadius: dimensions.buttonRadius,
        padding: dimensions.buttonPadding,
    },




    /*

    DEFINITIONS OF TYPES FOR TEXT FIELD STYLES


     */

    h1: {
        color: colors.appFirstColor,
        textAlign: 'center',
        fontSize: 80,
        fontWeight: 'bold',
    },

    h2: {
        color: colors.textColorBlack,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },

    h3: {
        color: colors.textColorBlack,
        textAlign: 'center',
        fontSize: dimensions.hugeTextSize,
        fontWeight: 'bold',
    },

    whiteNormalCenterText: {
        color: colors.appWhite,
        textAlign: 'center',
        fontSize: dimensions.normalTextSize,
    },

    whiteBoldCenterText: {
        color: colors.appWhite,
        textAlign: 'center',
        fontSize: dimensions.normalTextSize,
        fontWeight: 'bold',
    },

    blueNormalCenterText: {
        color: colors.appFirstColor,
        textAlign: 'center',
        fontSize: dimensions.normalTextSize,
    },

    secondButtonText: {
        color: colors.textColorBlack,
        textAlign: 'center',
        fontSize: dimensions.normalTextSize,
    },

    boldText: {
        fontWeight: 'bold',
    },

    inputError: {
        color: 'red',
        fontSize: dimensions.smallTextSize,
        textAlign: 'center',
        marginTop: 4,
    },

    /*


    DEFINITIONS OF TYPES STYLES FOR INPUT FIELDS


     */


    input: {
        height: dimensions.inputHigh,
        backgroundColor: colors.appWhite,
        color: colors.appFirstColor,
        borderWidth: 1,
        fontSize: dimensions.smallTextSize,
        borderColor: colors.appThirdColor,
        borderRadius: dimensions.inputRadius,
        paddingLeft: dimensions.inputPadding,
        paddingRight: dimensions.inputPadding,
    },

    inputText: {
        width: '90%',
        color: colors.textColorGray,
        fontSize: dimensions.smallTextSize,
        padding: 0,
    },


    /*


    OTHER STYLES


     */


    icon: {
        fontSize: dimensions.iconSize,
        color:colors.textColorGray,

    },

    lr_bottomText: {
        color: colors.textColorGray,
        textAlign: 'center',
        fontSize: dimensions.smallTextSize,
    },

    highlightText: {
        color: colors.appFirstColor,
    },

    flatlist: {
        gap: dimensions.itemGap,
        paddingBottom: dimensions.appNormalPadding,
        paddingLeft: dimensions.appNormalPadding,
        paddingRight: dimensions.appNormalPadding,
    },

    flatlistItem: {
        marginLeft: 2,
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: 10
    },

});
