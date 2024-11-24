import React,{ useState } from "react";
import { View,TextInput,Text,TouchableOpacity } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors,dimensions } from "../../style/styleValues.js";
import { NavigationProp } from "@react-navigation/native";
import ProcessingPopup from "../Global/ProcessingPopup.tsx";

type OnlinePaymentProps = {
    transactionId: number,
    paymentNumber: number,
    transactionAmount: number;
    navigation: NavigationProp<any>;
}

const OnlinePayment: React.FC<OnlinePaymentProps> = ({
                                                         transactionId,
                                                         paymentNumber,
                                                         transactionAmount,
                                                         navigation
                                                     }) => {

    const [code, setCode] = useState<string>()
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [popupText, setPopupText] = useState("");

    const processOnlinePayment = async (transactionNumber: number,transactionAmount: number, code: string) => {
        /*try {
            // Symulacja zapytania do API do płatności online
            const response = await fetch('https://api.paymentgateway.com/process-online', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactionNumber,
                    transactionAmount,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Płatność online zakończona pomyślnie!');
                // Przekierowanie lub dalsza logika po pomyślnej płatności
                //checkLocationAndConfirmTicket();
            } else {
                console.log('Płatność online nie powiodła się.');
            }
        } catch (error) {
            console.error('Błąd podczas przetwarzania płatności online:', error);
            console.log('Wystąpił błąd. Spróbuj ponownie.');
        }*/


        // Symuluj czas przetwarzania np. 3 sekundy


        setIsProcessing(true);
        setShowPopup(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPopupText("Transakcja zakończona pomyślne!")
        },2000);

    };


    const handleOnlinePayment = () => {
        if (paymentNumber && transactionAmount && code) {
            processOnlinePayment(paymentNumber,transactionAmount, code).then();
        } else {
            console.log('Proszę wprowadzić poprawne dane transakcji.');
        }
    };




    return (
        <View style={stylesApp.paymentBox}>

            <View style={[stylesApp.rowContainer, {alignSelf: "center"}]}>
                <Text style={stylesApp.whiteNormalCenterText}>Podaj kod</Text>
                <TextInput style={[stylesApp.input, {width: 120, textAlign: "center", borderRadius: dimensions.radius}]}
                           placeholder="6-cyfrowy kod"
                           value={code}
                           onChangeText={setCode}
                           keyboardType="numeric"
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />
            </View>


            <View style={stylesApp.separator} />

            <TouchableOpacity onPress={handleOnlinePayment} style={stylesApp.whiteButton}>
                <Text style={[stylesApp.popupText,{ color: colors.appFirstColor}]}>Zapłać</Text>
            </TouchableOpacity>

            { showPopup && (
                <ProcessingPopup
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    isProcessing={isProcessing}
                    cancelText={popupText}
                    navigation={navigation} />
            )}
        </View>
    );
};

export default OnlinePayment;
