import React,{ useEffect,useState } from "react";
import { View,Text,Button,TouchableOpacity } from "react-native";
import Popup from "./Popup.tsx";
import { NavigationProp,useNavigation } from "@react-navigation/native";
import stylesApp from "../style/stylesApp.js";
import { colors } from "../style/styleValues.js";
import PaymentPopup from "./PaymentPopup.tsx";

interface WalletPaymentProps {
    transactionAmount: number;
    navigation: NavigationProp<any>;
}
const WalletPayment: React.FC<WalletPaymentProps> = ({ transactionAmount, navigation }) => {

    const [balance, setBalance] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentPopupText, setPaymentPopupText] = useState("");


    const checkAccountBalance = () => {
        setBalance(0);

    };

    const closePopup = () => {
        setShowPopup(false);
        console.log("Transakcja niepowiodła się.")
        navigation.navigate('UserPanel', { screen: 'Tickets'});
    }

    const confirmBalancePopup = () => {
        navigation.navigate('UserPanel', { screen: 'Wallet'});
    }

    useEffect( () => {
        if (balance < transactionAmount) {
            setShowPopup(true);
        } else {
            setShowPopup(false)
        }
    }, [balance])

    useEffect(() => {
        checkAccountBalance();
    },[]);

    const processWalletPayment = async (transactionAmount: number) => {
        /*
        try {
            const response = await fetch('https://api.walletgateway.com/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: transactionAmount,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Płatność z portfela zakończona pomyślnie!');
                checkLocationAndConfirmTicket();
            } else {
                console.log('Płatność z portfela nie powiodła się.');
            }

        } catch (error) {
            console.error('Błąd podczas przetwarzania płatności z portfela:', error);
            console.log('Wystąpił błąd. Spróbuj ponownie.');
        }*/

        setIsProcessing(true);
        setShowPaymentPopup(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentPopupText("Transakcja zakończona pomyślne!")
        },2000);
    };

    const checkLocationAndConfirmTicket = () => {
        const isAtStop = true;
        if (isAtStop) {
            console.log('Czy chcesz skasować bilet?');
            /*if (confirmation) {
                console.log('Bilet skasowany!');
            }*/
        } else {
            console.log('Nie jesteś przy przystanku. Bilet nie może być skasowany.');
        }
    };

    const handleWalletPayment = () => {
        if (balance && balance >= transactionAmount) {
            processWalletPayment(transactionAmount).then();
        } else {
            console.log('Brak wystarczających środków. Czy chcesz doładować portfel?');
        }
    };

    return (
        <View style={stylesApp.paymentBox}>
            <Text style={stylesApp.whiteNormalCenterText}>Stan konta: <Text style={stylesApp.boldText}>{balance} PLN</Text></Text>
            <View style={stylesApp.separator}/>
            <TouchableOpacity onPress={handleWalletPayment} style={stylesApp.whiteButton}>
                <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>Zapłać z portfela</Text>
            </TouchableOpacity>

            {showPopup && (
                <Popup
                    showPopup={showPopup}
                    message={"Brak wystarczających środków. Czy chcesz doładować portfel?"}
                    confirmationText={"Tak"}
                    cancelText={"Nie"}
                    confirmationAction={confirmBalancePopup}
                    cancelAction={closePopup}
                />
            )}

            { showPaymentPopup && (
                <PaymentPopup
                    showPopup={showPaymentPopup}
                    setShowPopup={setShowPaymentPopup}
                    isProcessing={isProcessing}
                    cancelText={paymentPopupText}
                    navigation={navigation} />
            )}
        </View>
    );
};

export default WalletPayment;
