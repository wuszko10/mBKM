import React from "react";
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { useNavigation } from "@react-navigation/native";
import { colors,dimensions } from "../../style/styleValues.js";
import { NavigationProp } from "../../types/navigation.tsx";

const Welcome = () => {

    const navigation = useNavigation<NavigationProp>();

    function handleLogin() {
        navigation.navigate('Login');
    }

    function handleRegister() {
        navigation.navigate('Register');
    }

    return (
        <View style={localStyles.welcomeContainer}>
            <Text style={stylesApp.h1}>mBKM</Text>

            <View style={stylesApp.bigSeparator}/>

            <View style={stylesApp.welcomeButtonContainer}>
                <TouchableOpacity onPress={handleLogin} style={stylesApp.mainButton}>
                    <Text style={stylesApp.whiteBoldCenterText}>Zaloguj się</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegister} style={stylesApp.secondButton}>
                    <Text style={stylesApp.blueNormalCenterText}>Zarejestruj się</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    welcomeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.appBg,
        padding: dimensions.appPadding,
        justifyContent: 'flex-end',
    },
});

export default Welcome;
