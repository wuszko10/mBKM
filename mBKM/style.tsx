import { StyleSheet } from "react-native";
import { colors, dimensions } from "./src/style/styleValues.js";

export default StyleSheet.create({


    appContainer: {
        flex: 1,
        backgroundColor: colors.appWhite,
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

})
