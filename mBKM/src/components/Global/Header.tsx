import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesApp from '../../style/stylesApp.js'; // Adjust the import path if needed
import { colors,dimensions } from "../../style/styleValues.js";
import { useNavigation } from "@react-navigation/native";

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
        <View style={localStyles.headerItems}>
            <TouchableOpacity onPress={handleBack} style={localStyles.backIconBox}>
                <Icon name="angle-left" style={localStyles.icon} size={35}/>
            </TouchableOpacity>

            <Text style={stylesApp.h2Header}>{title}</Text>
        </View>
    );
};

const localStyles = StyleSheet.create({
    headerItems: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingBottom: 15,
    },

    backIconBox:{
        height: 30,
        width: 30,
        alignItems: "center",
    },

    icon: {
        marginTop: -3,
        color: colors.appFirstColor,
    },
});

export default Header;
