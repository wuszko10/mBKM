import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import PropTypes from "prop-types";
import { colors } from "../../style/styleValues.js";

type PropTypes = {
    duration: number;
    onFinish: () => void;

}

const CountdownProgressBar: React.FC<PropTypes> = (props) => {

    const progress = useRef(new Animated.Value(1)).current;

    useEffect(() => {

        Animated.timing(progress, {
            toValue: 0,
            duration: props.duration,
            useNativeDriver: false,
        }).start(() => {
            if (props.onFinish) props.onFinish();
        });
    }, [progress, props.duration, props.onFinish]);


    const width = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.progressBar, { width }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 10,
        backgroundColor: colors.appThirdColor, // Tło paska
        borderRadius: 5,
        overflow: 'hidden',
        zIndex: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.greenText,
    },
});

export default CountdownProgressBar;
