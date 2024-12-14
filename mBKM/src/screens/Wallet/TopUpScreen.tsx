import React,{ useEffect,useState } from "react";
import { ActivityIndicator,SafeAreaView,Text,TextInput,TouchableOpacity,View } from "react-native";
import { PaymentMethod,Ticket } from "../../types/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import stylesApp from "../../style/stylesApp.js";
import Header from "../../components/Global/Header.tsx";
import PaymentSelector from "../../components/Payments/PaymentSelector.tsx";
import { storage } from "../../../App.tsx";
import { WALLET_PAYMENT } from "../../../variables.tsx";
import { addTransaction } from "../../services/transaction.service.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { colors } from "../../style/styleValues.js";

const TopUpScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const [amount, setAmount] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [paymentMethodId, setPaymentMethodId] = useState<string>('');
    const [items, setItems] = useState([
        { label: "Karta", value: "card" },
        { label: "Przelew bankowy", value: "bank_transfer" },
        { label: "Portfel elektroniczny", value: "e_wallet" },
    ]);


    const [isLoading, setIsLoading] = useState(true);
    const [method, setMethod] = useState<PaymentMethod[]>();


    const getData = () => {
        if(!isLoading) return;

    const methodStr = storage.getString('paymentMethods');

    if (methodStr) {
        const parseMethod: PaymentMethod[] = JSON.parse(methodStr);

        const filteredMethod = parseMethod.filter(m => m.name !== WALLET_PAYMENT)
        setMethod(filteredMethod);
        setIsLoading(false);
    }
    }

    useEffect(()=>{
        getData();
    }, [isLoading])
    const handleTopUp = () => {
        if (!amount && !paymentMethod) {
            console.log('Proszę podać kwotę i wybrać metodę płatności');
            return;
        } else {

            // const data = await a(selectedTicket._id, finalPrice, paymentMethodId, userId, statusId);

            // if (data) {
                navigation.navigate('PaymentScreen', {
                    transactionId: 'ffff',
                    transactionNumber: 'ffff',
                    paymentMethodId: paymentMethodId,
                    transactionAmount: Number(amount),
                });
            // }

        }


    };


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
                />
            </View>


            <View>
                <Text style={[stylesApp.blackText, {paddingLeft: 20}]} >Kwota doładowania: {amount ? amount : 0} PLN</Text>
            </View>

            <View style={[stylesApp.divider, {marginVertical: 10}]} />

            <Text style={stylesApp.normalH3}>Wybierz rodzaj płatności</Text>

            <PaymentSelector paymentMethodId={paymentMethodId} setPaymentMethodId={setPaymentMethodId} methods={method}/>

            <View style={stylesApp.separator} />

            <TouchableOpacity onPress={handleTopUp} style={stylesApp.mainButton} >
                <Text style={stylesApp.whiteBoldCenterText}>Doładuj</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
};

export default TopUpScreen;
