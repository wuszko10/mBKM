import React,{ useEffect,useState } from "react";
import { View,Text,Button,TouchableOpacity } from "react-native";
import Popup from "../Global/Popup.tsx";
import { NavigationProp,useNavigation } from "@react-navigation/native";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import ProcessingPopup from "../Global/ProcessingPopup.tsx";
import { useCheckLocation } from "../Global/CheckLocation.tsx";
import { LOCATION_TIMEOUT } from "../../repositories/variables.tsx";

interface WalletPaymentProps {
    transactionId: number;
    transactionAmount: number;
    navigation: NavigationProp<any>
}


const WalletPayment: React.FC<WalletPaymentProps> = ({ transactionId, transactionAmount, navigation }) => {
    const [balance, setBalance] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentPopupText, setPaymentPopupText] = useState("");

    const [remainingTime, setRemainingTime] = useState(LOCATION_TIMEOUT);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const isInRange = useCheckLocation();

    const checkAccountBalance = () => {
        setBalance(10);

    };


    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                if (isInRange) {
                    console.log("Tutaj 0000");
                    clearInterval(interval);
                    return prevTime;
                }
                return prevTime - 500;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [isInRange]);


    console.log(timer+" | isinrange"+isInRange);
    const closePopup = () => {
        setShowPopup(false);
        console.log("Transakcja niepowiodła się.")
        navigation.navigate('UserPanel', { screen: 'Tickets'});
    }

    const confirmBalancePopup = () => {
        if (isInRange) {
            navigation.reset({
                index: 1, // Index odpowiada pozycji ekranu w nowym stosie.
                routes: [
                    { name: 'UserPanel', params: { screen: 'Tickets' } },
                    { name: 'ValidateTicket', params: { transactionId: transactionId } }
                ],
            });
        } else  {
            navigation.goBack();
        }
    }

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
        if (isInRange) {
            setTimeout( () => {
                    setIsProcessing(false);
                    setPopupText("Czy chcesz skasować bilet?");
                    setShowPopup(true);
                    setShowPaymentPopup(false);

                }, 2000
            )
        } else {
            setIsProcessing(false);
            setPaymentPopupText("Transakcja zakończona pomyślne!")
        }
    };

    const handleWalletPayment = () => {
        if (balance && (balance >= transactionAmount)) {
            processWalletPayment(transactionAmount).then();
        } else {
            setPopupText("Brak wystarczających środków. Czy chcesz doładować portfel?");
            setShowPopup(true);
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
                    message={popupText}
                    confirmationText={"Tak"}
                    cancelText={"Nie"}
                    confirmationAction={confirmBalancePopup}
                    cancelAction={closePopup}
                />
            )}

            { showPaymentPopup && (
                <ProcessingPopup
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
