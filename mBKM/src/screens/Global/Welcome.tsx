import React from "react";
import { Image,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/appStyle.js";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import style from './style.tsx';

const Welcome = () => {

    const navigation = useNavigation<NavigationProp>();
    function handleLogin() {
        navigation.navigate('Login');
    }

    function handleRegister() {
        navigation.navigate('Register');
    }

    return (
        <View style={style.welcomeContainer}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={{ width: 150, height: 150 }}
                />
                <Text style={style.h1}>mBKM</Text>
            </View>

            <View style={style.bigSeparator}/>

            <View style={style.welcomeButtonContainer}>
                <TouchableOpacity onPress={handleLogin} style={stylesApp.mainButton}>
                    <Text style={stylesApp.whiteBoldCenterText}>Zaloguj się</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegister} style={style.secondButton}>
                    <Text style={style.blueNormalCenterText}>Zarejestruj się</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Welcome;
