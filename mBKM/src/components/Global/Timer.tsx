import React,{ useEffect,useRef,useState } from "react";
import { View,StyleSheet,Animated,Text } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../style/styleValues.js";
import { SEASON_TICKET,SINGLE_TICKET } from "../../../variables.tsx";
import stylesApp from "../../style/stylesApp.js";

type PropTypes = {
    startTime: Date | undefined;
    endTime: Date | undefined;
    type: string | undefined;
    onFinish: () => void;
}

const Timer: React.FC<PropTypes> = (props) => {


    const startTime = (props.startTime) ? new Date(props.startTime).getTime() : -1;
    const endTime = (props.endTime) ? new Date(props.endTime).getTime() : -1;

    const duration = Math.max(endTime - Date.now(), 0);
    const oneDayToEnd = 24 * 60 * 60 * 1000;

    const [remainingTime, setRemainingTime] = useState(duration);
    const progress = useRef(new Animated.Value(1)).current;

    const totalDuration = endTime - startTime;


    useEffect(() => {

        if (props.type === SINGLE_TICKET || (props.type === SEASON_TICKET && duration <= oneDayToEnd)) {
            progress.setValue( duration / totalDuration);
            Animated.timing(progress, {
                toValue: 0,
                duration: duration,
                useNativeDriver: false,
            }).start(() => {
                props.onFinish();
            });
        }

    }, [startTime, endTime, progress, duration, props]);

    useEffect(()=> {
        const interval = setInterval(() => {
            const timeLeft = Math.max(endTime - Date.now(), 0);
            setRemainingTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(interval);
                props.onFinish();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime])


    const width = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const getPolishPlural = (count: number, singular: string, plural: string, pluralMany: string) => {
        if (count === 1) {
            return singular;
        } else if (count > 1 && count < 5) {
            return plural;
        } else {
            return pluralMany;
        }
    };

    const formatRemainingTime = (remainingTime: number) => {
        const seconds = Math.floor(remainingTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);  // Zakładając średnią liczbę dni w miesiącu

        if (months > 1) {
            return `Ważny przez ${months} ${getPolishPlural(months, 'miesiąc', 'miesiące', 'miesięcy')}`;
        } else if (days > 1) {
            return `Ważny przez ${days} ${getPolishPlural(days, 'dzień', 'dni', 'dni')}`;
        } else if (hours > 1) {
            return `Ważny przez ${hours} ${getPolishPlural(hours, 'godzina', 'godziny', 'godzin')}`;
        } else if (minutes > 0) {
            return `Ważny przez ${minutes} ${getPolishPlural(minutes, 'minuta', 'minuty', 'minut')}`;
        } else {
            return `Ważny mniej niż minutę`;
        }
    };

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
