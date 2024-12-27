import React,{ useState } from "react";
import { View,TextInput,Text,TouchableOpacity,StyleSheet } from "react-native";
import ProcessingPopup from "../Global/ProcessingPopup.tsx";
import stylesApp from "../../style/stylesApp.js";
import { colors,dimensions } from "../../style/styleValues.js";
import { payCard,topUpCard } from "../../services/payment.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { storage } from "../../../App.tsx";

type CardPaymentProps = {
    transactionId: string,
    transactionAmount: number;
    userTicketId?: string;
    cancelPopup: () => void;
}

const CardPayment: React.FC<CardPaymentProps> = (props) => {

    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [popupText, setPopupText] = useState("");
    const {wallet, setWallet, token} = useAuth();

    const processCardPayment = async (cardNumber: string, expiryDate: string, cvv: string) => {

        setIsProcessing(true);
        let data;
        try {
            if (props.userTicketId) {
                data = await payCard(props.transactionAmount, props.transactionId, cardNumber, expiryDate, cvv, props.userTicketId, token ? token : '');
            } else {
                data = await topUpCard(props.transactionAmount, props.transactionId, cardNumber, expiryDate, cvv, wallet ? wallet?.id : '', token ? token : '');
                if (data) {
                    setWallet(data);
                    storage.set('wallet', JSON.stringify(data));
                }
            }

            if (data) {
                setPopupText("Transakcja zakończona pomyślnie!");
            }
        } catch (error) {
            if (error.response.status === 406) {
                setPopupText("Podano błędne dane karty.");
            } else if (error.response.status === 404) {
                setPopupText("Błąd karty.");
            } else {
                setPopupText("Wystąpił błąd podczas przetwarzania płatności.");
            }
        } finally {
            setIsProcessing(false);
            setShowPopup(true);
        }
    };

    const handleCardPayment = () => {
        if (props.transactionAmount && cardNumber && expiryDate && cvv) {
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
                <ProcessingPopup
                    showPopup={showPopup}
                    isProcessing={isProcessing}
                    cancelText={popupText}
                    cancelAction={props.cancelPopup} />
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
