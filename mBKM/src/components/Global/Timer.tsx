import React from "react";
import { View,StyleSheet,Animated,Text } from "react-native";
import { colors } from "../../style/styleValues.js";
import { SEASON_TICKET,SINGLE_TICKET } from "../../../variables.tsx";
import stylesApp from "../../style/stylesApp.js";
import { formatRemainingTime } from "../../utils/timer.tsx";
import { useTimerLogic } from "../../hooks/Global/useTimerLogic.tsx";

export type TimerPropTypes = {
    startTime: Date | undefined;
    endTime: Date | undefined;
    type: string | undefined;
    onFinish: () => void;
    setActiveTickets: (activeTickets: boolean) => void;
}

const Timer: React.FC<TimerPropTypes> = (props) => {

    const {
        duration,
        oneDayToEnd,
        remainingTime,
        width
    } = useTimerLogic(props);


    return (
        <View style={stylesApp.gapContainer}>
            { (props.type === SINGLE_TICKET || (props.type === SEASON_TICKET && duration <= oneDayToEnd)) ?
                <View style={styles.container}>
                    <Animated.View style={[styles.progressBar, { width }]} />
                </View>
                :
                <View style={[stylesApp.divider, {borderColor: colors.greenText}]} />
            }
            <Text style={stylesApp.activeTicketText}>{formatRemainingTime(remainingTime)}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        height: 10,
        backgroundColor: colors.appThirdColor,
        borderRadius: 5,
        overflow: 'hidden',
        zIndex: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.greenText,
    },
});

export default Timer;
