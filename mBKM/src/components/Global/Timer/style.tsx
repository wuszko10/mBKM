import { StyleSheet } from "react-native";
import { dimensions } from "../../../style/styleValues";

export default StyleSheet.create({

    gapTimerContainer: {
        display: 'flex',
        gap: dimensions.itemGap,
    },

    activeTicketText: {
        color: '#10430a',
        textAlign: 'center',
        fontSize: dimensions.smallTextSize,
    },
})
