import React from "react";
import { Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../style/stylesApp.js";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackPramList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
}

type NavigationProp = StackNavigationProp<RootStackPramList>
const Welcome = () => {
    const navigation = useNavigation<NavigationProp>();

    function handleLogin() {
        navigation.navigate('Login');
    }

    function handleRegister() {
        navigation.navigate('Register');
    }

    return (
        <View style={stylesApp.welcomeContainer}>
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

export default Welcome;
