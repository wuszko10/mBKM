import React,{ useState } from "react";
import { SafeAreaView,Text,TextInput,TouchableOpacity,View } from "react-native";
import { Ticket } from "../../repositories/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    TopUpScreen: undefined;
    Home: undefined;
    PaymentScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'TopUpScreen'>;

const TopUpScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const [amount, setAmount] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems] = useState([
        { label: "Karta", value: "card" },
        { label: "Przelew bankowy", value: "bank_transfer" },
        { label: "Portfel elektroniczny", value: "e_wallet" },
    ]);

    const handleTopUp = () => {
        if (!amount || !paymentMethod) {
            console.log('Proszę podać kwotę i wybrać metodę płatności');
            return;
        }

        // Przykład nawigacji do ekranu płatności
        /*navigation.navigate('PaymentScreen', {
            amount,
            paymentMethod,
        });*/
    };

    return (
        <SafeAreaView>
            <Text>Doładuj Konto</Text>

            <View>
                <Text>Kwota doładowania:</Text>
                <TextInput

                    value={amount}
                    onChangeText={setAmount}
                    placeholder="Wpisz kwotę"
                    keyboardType="numeric"
                />
            </View>


            <View>
                <Text >Kwota doładowania: {amount} PLN</Text>
                {paymentMethod && <Text>Metoda płatności: {paymentMethod}</Text>}
            </View>

            <TouchableOpacity onPress={handleTopUp} >
                <Text >Doładuj</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Text >Powrót</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default TopUpScreen;
