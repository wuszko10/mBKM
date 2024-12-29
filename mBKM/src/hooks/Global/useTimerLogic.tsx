import { useEffect,useRef,useState } from "react";
import { Animated } from "react-native";
import { SEASON_TICKET,SINGLE_TICKET } from "../../../variables.tsx";
import { TimerPropTypes } from "../../components/Global/Timer.tsx";

export const useTimerLogic = (props: TimerPropTypes) => {

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
                props.setActiveTickets(false);
            });
            props.setActiveTickets(true);
        }

    }, [startTime, endTime, progress, duration, props]);

    useEffect(()=> {

        if (remainingTime <= 0) {
            props.setActiveTickets(false);
            return;
        }

        const interval = setInterval(() => {
            const timeLeft = Math.max(endTime - Date.now(), 0);
            setRemainingTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(interval);
                props.setActiveTickets(false);
            }
        }, 60 * 1000);
        props.setActiveTickets(true);
        return () => clearInterval(interval);
    }, [remainingTime, props])


    const width = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return {
        duration,
        oneDayToEnd,
        remainingTime,
        width
    };
}
