import React,{ useState } from "react";
import { SafeAreaView,Text,TextInput,TouchableOpacity,View } from "react-native";
import { PaymentMethod,Ticket } from "../../types/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import stylesApp from "../../style/stylesApp.js";
import Header from "../../components/Global/Header.tsx";
import PaymentSelector from "../../components/Payments/PaymentSelector.tsx";
import { paymentMethods } from "../../repositories/Data.tsx";

type RootStackParamList = {
    TopUpScreen: undefined;
    Home: undefined;
    PaymentScreen: {transactionId: number, paymentMethodId: number, transactionAmount: number};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'TopUpScreen'>;

const TopUpScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const [amount, setAmount] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [paymentMethodId, setPaymentMethodId] = useState(0);
    const [items, setItems] = useState([
        { label: "Karta", value: "card" },
        { label: "Przelew bankowy", value: "bank_transfer" },
        { label: "Portfel elektroniczny", value: "e_wallet" },
    ]);

    const filteredMethods: PaymentMethod[] = paymentMethods
        .filter(method => method.label != "Portfel");

    const handleTopUp = () => {
        if (!amount && !paymentMethod) {
            console.log('Proszę podać kwotę i wybrać metodę płatności');
            return;
        } else {
            const id = Math.floor(Math.random() * 10000);
            navigation.navigate('PaymentScreen', {
                transactionId: id,
                paymentMethodId: paymentMethodId,
                transactionAmount: Number(amount),
            });
        }


    };

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

            <PaymentSelector paymentMethodId={paymentMethodId} setPaymentMethodId={setPaymentMethodId} methods={filteredMethods}/>

            <View style={stylesApp.separator} />

            <TouchableOpacity onPress={handleTopUp} style={stylesApp.mainButton} >
                <Text style={stylesApp.whiteBoldCenterText}>Doładuj</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
};

export default TopUpScreen;
