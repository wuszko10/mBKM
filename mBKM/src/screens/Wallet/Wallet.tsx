import React from 'react';
import { ActivityIndicator,FlatList,SafeAreaView,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/appStyle.js";
import { colors } from "../../style/styleValues.js";
import { TopUpTransaction } from "../../types/interfaces.tsx";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Global/Header/Header.tsx";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../context/AuthContext.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { useWalletLogic } from "../../hooks/Wallet/useWalletLogic.tsx";
import { style,style as localStyles } from "./style.tsx";

const Wallet = () => {

    const navigation = useNavigation<NavigationProp>();
    const { wallet} = useAuth();
    const { topUps, isLoading } = useWalletLogic();

    const renderItem= ({item} : {item: TopUpTransaction}) => {

        return (
            <View style={stylesApp.flatlistItem}>
                <Text style={localStyles.text}>Numer doładowania: <Text style={stylesApp.boldText}>{item.number}</Text></Text>
                <Text style={localStyles.text}>Kwota: <Text style={stylesApp.boldText}>{item.amount.toFixed(2)} zł</Text></Text>
                <Text style={localStyles.text}>Data: <Text style={stylesApp.boldText}>{new Date(item.paymentDate).toLocaleDateString()}</Text></Text>
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
                <Text style={style.h3}>Wpłaty</Text>
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



export default Wallet;
