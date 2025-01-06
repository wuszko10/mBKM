import { StyleSheet } from "react-native";
import { colors, dimensions } from "./styleValues";

export default StyleSheet.create({

    // global

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


    separator: {
        height: dimensions.separator,
    },

    divider: {
        borderBottomWidth: 0.5,
        borderColor: colors.gray,
    },

    fullBlueContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems: "stretch",
        backgroundColor: colors.appFirstColor,
        gap: 30,
        paddingHorizontal: dimensions.appPadding,
    },

    // flatList

    emptyFlatListContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.appThirdColor,
        padding: dimensions.appPadding,
        justifyContent: 'center',
        gap: dimensions.itemGapBig,
        borderRadius: dimensions.radius
    },

    emptyFlatListText: {
        color: colors.appFirstColor,
        textAlign: 'center',
        fontSize: dimensions.largeTextSize,
        fontWeight: 'bold',
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

    // icon


    icon: {
        fontSize: dimensions.iconSize,
        color:colors.darkGray,

    },


    // buttons


    mainButton: {
        backgroundColor: colors.appFirstColor,
        borderRadius: dimensions.buttonRadius,
        paddingVertical: dimensions.buttonPadding,
        paddingHorizontal: 50,
    },



    whiteButton: {
        backgroundColor: colors.appWhite,
        borderRadius: dimensions.radius,
        paddingVertical: 10,
        paddingHorizontal: dimensions.appPadding,
    },

    whiteButtonText: {
        textAlign: "center",
        fontSize: dimensions.largeTextSize,
        fontWeight: "bold",
        color: colors.appWhite,
    },



    // text


    normalH3: {
        color: colors.textColorBlack,
        textAlign: 'left',
        fontSize: dimensions.largeTextSize,
        fontWeight: '600',
        paddingLeft: 10,
    },

    boldText: {
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


    itemText: {
        fontSize: 16,
        color: colors.textColorBlack,
    },


    blackText: {
        color: colors.textColorBlack,
    },


    // input form


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
        height: dimensions.inputHigh,
        padding: 0,
    },

});
