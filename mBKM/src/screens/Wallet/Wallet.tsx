import React from 'react';
import { ActivityIndicator,FlatList,SafeAreaView,ScrollView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors,dimensions } from "../../style/styleValues.js";
import LinearGradient from 'react-native-linear-gradient';
import { Ticket,TopUpTransaction } from "../../types/interfaces.tsx";
import { topUpTransactions } from "../../repositories/Data.tsx";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Global/Header.tsx";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../context/AuthContext.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { useWalletLogic } from "../../hooks/Wallet/useWalletLogic.tsx";

const Wallet = () => {

    const navigation = useNavigation<NavigationProp>();

    const { wallet} = useAuth();

    const { topUps, isLoading } = useWalletLogic();

    const renderItem= ({item} : {item: TopUpTransaction}) => {

        return (
            <View style={stylesApp.flatlistItem}>
                <Text style={localStyles.text}>Numer doładowania: <Text style={stylesApp.boldText}>{item.number}</Text></Text>
                <Text style={localStyles.text}>Kwota: <Text style={stylesApp.boldText}>{item.amount.toFixed(2)} zł</Text></Text>
                <Text style={localStyles.text}>Data: <Text style={stylesApp.boldText}>{new Date(item.paymentDate).toLocaleString()}</Text></Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={stylesApp.container}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
    }

    return (

        <SafeAreaView style={stylesApp.container}>
            <Header title="Portfel"/>


            <View style={localStyles.balanceContainer}>
                <View>
                    <Text style={{color: colors.textColorBlack}}>Stan konta:</Text>
                    <Text style={localStyles.balanceText}>{Number(wallet?.amount).toFixed(2).replace('.',',')} zł</Text>
                </View>

                <TouchableOpacity style={localStyles.topUpBox} onPress={() => (navigation.navigate('TopUpScreen'))}>
                    <Mci name="wallet-plus-outline" size={24} style={{color: colors.appFirstColor}}/>
                    <Text style={{color: colors.textColorBlack}}>Doładuj</Text>
                </TouchableOpacity>
            </View>

            <View style={localStyles.transactionContainer}>
                <Text style={stylesApp.h3}>Wpłaty</Text>
            </View>

            { topUps && topUps.length > 0? (
                <FlatList
                    style={stylesApp.flatlist}
                    data={topUps}
                    renderItem={renderItem}
                />
            ) : (
                <View style={stylesApp.emptyFlatListContainer}>
                    <Text style={stylesApp.emptyFlatListText}>Brak wpłat</Text>
                </View>
            )}

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
