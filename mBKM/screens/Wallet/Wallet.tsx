import React from 'react';
import { FlatList,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors,dimensions } from "../../style/styleValues.js";
import LinearGradient from 'react-native-linear-gradient';
import { Ticket,TopUpTransaction } from "../../repositories/interfaces.tsx";
import { topUpTransactions } from "../../repositories/Data.tsx";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Global/Header.tsx";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";


type RootStackParamList = {
    Home: undefined;
    Wallet: undefined;
    TopUpScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Wallet'>;
const Wallet = () => {

    const navigation = useNavigation<NavigationProp>();

    const renderItem= ({item} : {item: TopUpTransaction}) => {

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
            <Header title="Portfel"/>


            <View style={localStyles.balanceContainer}>
                <View>
                    <Text style={{color: colors.textColorBlack}}>Stan konta:</Text>
                    <Text style={localStyles.balanceText}>100,00 zł</Text>
                </View>

                <TouchableOpacity style={localStyles.topUpBox} onPress={() => (navigation.navigate('TopUpScreen'))}>
                    <Mci name="wallet-plus-outline" size={24} style={{color: colors.appFirstColor}}/>
                    <Text style={{color: colors.textColorBlack}}>Doładuj</Text>
                </TouchableOpacity>
            </View>

            <View style={localStyles.transactionContainer}>
                <Text style={stylesApp.h3}>Wpłaty</Text>
            </View>

                <FlatList
                    style={stylesApp.flatlist}
                    data={topUpTransactions}
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
        backgroundColor: colors.appBg,
        borderRadius: dimensions.inputRadius,
    },

    balanceText:{
        color: colors.appFirstColor,
        fontSize: 40,
        fontWeight: 'bold',
    },

    transactionContainer: {
        marginTop: dimensions.appNormalPadding,
        paddingLeft: 15,
    },

    item: {
        marginLeft: 2,
        padding: 15,
        marginVertical: 5,
        backgroundColor: colors.appThirdColor,
        borderRadius: 10
    },

    text: {
        fontSize: 16,
        color: colors.textColorBlack,
    },
    topUpBox: {
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default Wallet;
