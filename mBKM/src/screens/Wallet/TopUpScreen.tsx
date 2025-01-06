import React from "react";
import { ActivityIndicator,SafeAreaView,Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import Header from "../../components/Global/Header/Header.tsx";
import PaymentSelector from "../../components/Payments/PaymentSelector.tsx";
import { colors } from "../../style/styleValues.js";
import { useAuth } from "../../context/AuthContext.tsx";
import { useTopUpLogic } from "../../hooks/Wallet/useTopUpLogic.tsx";

const TopUpScreen = () => {

    const { userId, token } = useAuth();

    const {
        paymentMethodId,
        amount,
        filteredMethods,
        isLoading,
        setPaymentMethodId,
        setAmount,
        handleTopUp
    } = useTopUpLogic(userId, token);


    if (isLoading) {
        return (
            <View style={stylesApp.container}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
    }

    return (
        <SafeAreaView style={stylesApp.container}>
            <Header title={"Doładuj konto"}/>

            <View style={stylesApp.separator} />

            <Text style={stylesApp.normalH3}>Podaj kwotę doładowania</Text>
            <View>
                <TextInput
                    style={stylesApp.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Wpisz kwotę"
                    keyboardType="numeric"
                    placeholderTextColor={colors.darkGray}
                />
            </View>

            <View style={[stylesApp.divider, {marginVertical: 10}]} />

            <Text style={stylesApp.normalH3}>Wybierz rodzaj płatności</Text>

            <PaymentSelector
                paymentMethodId={paymentMethodId}
                setPaymentMethodId={setPaymentMethodId}
                methods={filteredMethods}/>

            <View style={stylesApp.separator} />


            <View>
                <Text style={[stylesApp.blackText, {textAlign: 'center'}]} >Kwota doładowania: {amount ? (Number(amount).toFixed(2).replace('.',',') + ' zł') : '--,--'}</Text>
            </View>
            <View style={stylesApp.separator} />
            <TouchableOpacity onPress={handleTopUp} style={stylesApp.mainButton} >
                <Text style={stylesApp.whiteBoldCenterText}>Doładuj</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
};

export default TopUpScreen;
