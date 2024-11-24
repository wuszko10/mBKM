import React from 'react';
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../components/Global/AuthContext.tsx";

type RootStackPramList = {
    Welcome: undefined;
    UserPanel: undefined;
}

type NavigationProp = StackNavigationProp<RootStackPramList>
const Home = () => {

    const navigation = useNavigation<NavigationProp>();
    const { setToken } = useAuth();

    async function handleLogout() {
        await AsyncStorage.removeItem('token');
        setToken('');
        navigation.navigate('Welcome');
    }

    return (
        <View style={stylesApp.container}>
            <Text style={stylesApp.h2}>HOME</Text>

            <View style={stylesApp.separator}/>

            <TouchableOpacity onPress={handleLogout} style={stylesApp.mainButton}>
                <Text style={stylesApp.whiteBoldCenterText}>Wyloguj się</Text>
            </TouchableOpacity>
        </View>
    )
};

const localStyles = StyleSheet.create({

});

export default Home;
