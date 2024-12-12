import { StyleSheet } from "react-native";
import { colors, dimensions } from "./styleValues";
import { colorOpacity } from "twrnc/dist/esm/resolve/color";

export default StyleSheet.create({

    appContainer: {
        flex: 1,
        backgroundColor: colors.appWhite,
    },

    scrollContainer: {
        backgroundColor: colors.appWhite,
    },

    container: {
        flex: 1,
        backgroundColor: colors.appWhite,
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        gap: dimensions.itemGap,
    },

    contentBox: {
        flexDirection: "column",
        gap: dimensions.itemGap,
    },

    rowContainer: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
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

    divider: {
        borderBottomWidth: 1,
        borderColor: colors.appThirdColor,
    },

    bigSeparator: {
        height: 240,
    },

    gapContainer: {
        display: 'flex',
        gap: dimensions.itemGap,
    },

    tabBarStyle: {
        minHeight: 60,
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: colors.appWhite,
    },

    tabBarItemStyle: {
        margin: 3,
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
        paddingVertical: dimensions.buttonPadding,
        paddingHorizontal: 50,
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
        textAlign: 'left',
        fontSize: 40,
        fontWeight: 'bold',
    },

    h2Header: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
    },

    h3: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: dimensions.hugeTextSize,
        fontWeight: 'bold',
    },

    normalH3: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: dimensions.largeTextSize,
        fontWeight: '600',
        paddingLeft: 10,
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

    itemText: {
        fontSize: 16,
        color: colors.textColorBlack,
    },

    inputError: {
        color: 'red',
        fontSize: dimensions.smallTextSize,
        textAlign: 'center',
        marginTop: 4,
    },

    blackText: {
        color: colors.textColorBlack,
    },

    labelInputText: {
        color: colors.textColorBlack,
        paddingLeft: 10,
        fontSize: dimensions.smallTextSize,
    },

    /*


    DEFINITIONS OF TYPES STYLES FOR INPUT FIELDS


     */

    inputBox: {
        gap: 5,
    },

    input: {
        height: dimensions.inputHigh,
        backgroundColor: colors.appThirdColor,
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
        color: colors.darkGray,
        fontSize: dimensions.smallTextSize,
        padding: 0,
    },


    /*


    OTHER STYLES


     */


    icon: {
        fontSize: dimensions.iconSize,
        color:colors.darkGray,

    },

    lr_bottomText: {
        color: colors.gray,
        textAlign: 'center',
        fontSize: dimensions.smallTextSize,
    },

    highlightText: {
        color: colors.appFirstColor,
    },

    flatlist: {
        gap: dimensions.itemGap,
    },

    flatlistItem: {
        marginLeft: 2,
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: dimensions.radius,
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
    summaryBox:{
        marginVertical: 45,
        bottom: 10,
        alignItems: "center",
        gap: 12,
    },
    finalPrice: {
        color: colors.textColorBlack,
        fontSize: dimensions.largeTextSize,
    },
    ticketBox: {
        backgroundColor: colors.appThirdColor,
        borderRadius: dimensions.radius,
        gap: dimensions.appNormalPadding+10,
        flexDirection: "row",
        alignItems: "center"
    },
    ticketIcon: {
        padding: dimensions.appNormalPadding,
        color: colors.appWhite,
        backgroundColor: colors.appFirstColor,
        borderRadius: dimensions.radius,
    },

    paymentContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        paddingHorizontal: dimensions.appPadding,
        backgroundColor: colors.appWhite,
        gap: 30,
    },

    paymentBox: {
        flexDirection: "column",
        gap: dimensions.itemGap,
        alignSelf: "stretch",
    },

    popupContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: colors.appFirstColor,
        gap: 30,
        paddingHorizontal: dimensions.appPadding,
    },

    popupText: {
        textAlign: "center",
        fontSize: dimensions.largeTextSize,
        fontWeight: "bold",
        color: colors.appWhite,
    },

    popupBtn: {
        flex: 1,
        backgroundColor: colors.appWhite,
        borderRadius: dimensions.radius,
        paddingVertical: 10,
    },

    whiteButton: {
        backgroundColor: colors.appWhite,
        borderRadius: dimensions.radius,
        paddingVertical: 10,
        paddingHorizontal: dimensions.appPadding,
    },
});
