import React from 'react';
import { View,Text,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import style from "./style.tsx";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {

    const navigation = useNavigation();
    function handleBack() {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    return (
        <View style={style.headerItems}>
            <TouchableOpacity onPress={handleBack} style={style.backIconBox}>
                <Icon name="angle-left" style={style.icon} size={35}/>
            </TouchableOpacity>

            <Text style={style.h2Title}>{title}</Text>
        </View>
    );
};
export default Header;
