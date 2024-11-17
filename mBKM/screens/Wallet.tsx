import React from 'react';
import { FlatList,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../style/stylesApp.js";
import { colors,dimensions } from "../style/styleValues.js";
import LinearGradient from 'react-native-linear-gradient';
import { Ticket,TransactionData } from "../repositories/interfaces.tsx";
import { transactions } from "../repositories/Data.tsx";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
    Home: undefined;
    Wallet: undefined;
    TopUpScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Wallet'>;
const Wallet = () => {

    const navigation = useNavigation<NavigationProp>();

    const renderItem= ({item} : {item: TransactionData}) => {

        return (
            <View style={stylesApp.flatlistItem}>
                <Text style={localStyles.text}>Transaction ID: {item.transactionId}</Text>
                <Text style={localStyles.text}>Amount: ${item.amount.toFixed(2)}</Text>
                <Text style={localStyles.text}>Date: {new Date(item.date).toLocaleString()}</Text>
            </View>
        )
    }

    return (

        <SafeAreaView style={stylesApp.container}>
            <View style={localStyles.balanceContainer}>

                <View>
                    <Text>Stan konta:</Text>
                    <Text style={localStyles.balanceText}>100,00 zł</Text>
                </View>

                <TouchableOpacity onPress={() => (navigation.navigate('TopUpScreen'))}>
                    <Text>Doładuj</Text>
                </TouchableOpacity>
            </View>

            <View style={stylesApp.separator} />

            <View style={localStyles.transactionContainer}>
                <Text style={stylesApp.h3}>Wpłaty</Text>
            </View>

                <FlatList
                    style={stylesApp.flatlist}
                    data={transactions}
                    renderItem={renderItem}
                />

        </SafeAreaView>

    );
};

const localStyles = StyleSheet.create({
    balanceContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 30,
        marginRight: dimensions.appNormalPadding,
        marginLeft: dimensions.appNormalPadding,
        backgroundColor: colors.appBg,
        borderRadius: dimensions.inputRadius,
    },

    balanceText:{
        color: colors.appFirstColor,
        fontSize: 40,
        fontWeight: 'bold',
    },

    transactionContainer: {
        padding: dimensions.appNormalPadding,
    },

    item: {
        marginLeft: 2,
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: 10
    },
    text: {
        fontSize: 16
    }
});

export default Wallet;
