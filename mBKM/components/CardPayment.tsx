import React,{ useState } from "react";
import { View,TextInput,Button,Text,TouchableOpacity,StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import PaymentPopup from "./PaymentPopup.tsx";
import stylesApp from "../style/stylesApp.js";
import { colors,dimensions } from "../style/styleValues.js";

type CardPaymentProps = {
    paymentNumber: number,
    transactionAmount: number;
    navigation: NavigationProp<any>;
}


const CardPayment: React.FC<CardPaymentProps> = ({
    paymentNumber,
    transactionAmount,
    navigation
                     }) => {

    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [popupText, setPopupText] = useState("");

    const processCardPayment = async (cardNumber: string, expiryDate: string, cvv: string) => {
        /*try {
            const response = await fetch('https://api.paymentgateway.com/process-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardNumber,
                    expiryDate,
                    cvv,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Płatność kartą przebiegła pomyślnie!');
                // Przekierowanie lub dalsza logika po pomyślnej płatności
                //checkLocationAndConfirmTicket();
            } else {
                console.log('Płatność kartą nie powiodła się.');
            }
        } catch (error) {
            console.error('Błąd podczas przetwarzania płatności kartą:', error);
            console.log('Wystąpił błąd. Spróbuj ponownie.');
        }*/
        setIsProcessing(true);
        setShowPopup(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPopupText("Transakcja zakończona pomyślne!")
        },2000);
    };

    const handleCardPayment = () => {
        if (paymentNumber && transactionAmount && cardNumber && expiryDate && cvv) {
            processCardPayment(cardNumber,expiryDate,cvv).then();
        } else {
            console.log('Proszę wprowadzić poprawne dane karty.');
        }
    };

    return (
        <View style={stylesApp.paymentBox}>


                <View style={localStyle.inputBox}>
                    <Text style={localStyle.text}>Numer karty</Text>
                    <TextInput style={[stylesApp.input, localStyle.inputText]}
                               placeholder="1234 5678 9012 3456"
                               value={cardNumber}
                               onChangeText={setCardNumber}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

                <View style={localStyle.inputBox}>
                    <Text style={localStyle.text}>Data{"\n"}ważności</Text>
                    <TextInput style={[stylesApp.input, localStyle.inputText]}
                               placeholder="01/29"
                               value={expiryDate}
                               onChangeText={setExpiryDate}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

                <View style={localStyle.inputBox}>
                    <Text style={localStyle.text}>Podaj kod</Text>
                    <TextInput style={[stylesApp.input, localStyle.inputText]}
                               placeholder="XXX"
                               value={cvv}
                               onChangeText={setCvv}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

            <View style={stylesApp.separator} />


            <TouchableOpacity onPress={handleCardPayment} style={stylesApp.whiteButton}>
                <Text style={[stylesApp.popupText,{ color: colors.appFirstColor}]}>Zapłać kartą</Text>
            </TouchableOpacity>

            { showPopup && (
                <PaymentPopup
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    isProcessing={isProcessing}
                    cancelText={popupText}
                    navigation={navigation} />
            )}
        </View>
    );
};

const localStyle = StyleSheet.create({

    inputBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
    },
    inputText: {
        flex: 1,
        textAlign: "left",
        borderRadius: dimensions.radius,
        paddingLeft: 10,
    },
    text: {
        ...stylesApp.whiteNormalCenterText,
        width: 56,
        fontSize: 13,
        textAlign: "right",
    }
})

export default CardPayment;
