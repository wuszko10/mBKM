import React from "react";
import { View,TextInput,Text,TouchableOpacity } from "react-native";
import ProcessingPopup from "../Popups/ProcessingPopup.tsx";
import stylesApp from "../../style/appStyle.js";
import { colors } from "../../style/styleValues.js";
import { useAuth } from "../../context/AuthContext.tsx";
import { useCardPaymentLogic } from "../../hooks/Payment/useCardPaymentLogic.tsx";
import style from "./style.tsx";

export type CardPaymentProps = {
    transactionId: string,
    transactionAmount: number;
    userTicketId?: string;
    setStopPayment: React.Dispatch<React.SetStateAction<boolean>>;
    cancelPopup: () => void;
}

const CardPayment: React.FC<CardPaymentProps> = (props) => {

    const { wallet, setWallet, token} = useAuth();

    const {
        cardNumber,
        expiryDate,
        cvv,
        cardNumberError,
        expiryDateError,
        cvvError,
        showPopup,
        isProcessing,
        popupText,
        handleExpiryDateChange,
        handleCardNumberChange,
        validCVV,
        handleCardPayment,
    } = useCardPaymentLogic(props, wallet, setWallet, token);

    return (
        <View style={style.paymentBox}>


                <View style={style.inputBox}>
                    <Text style={style.text}>Numer karty</Text>
                    <TextInput style={[stylesApp.input, style.inputText, { borderColor: cardNumberError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="1234 5678 9012 3456"
                               value={cardNumber}
                               onChangeText={handleCardNumberChange}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               maxLength={19}
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

                <View style={style.inputBox}>
                    <Text style={style.text}>Data{"\n"}ważności</Text>
                    <TextInput style={[stylesApp.input, style.inputText, { borderColor: expiryDateError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="01/29"
                               value={expiryDate}
                               onChangeText={handleExpiryDateChange}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               maxLength={5}
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

                <View style={style.inputBox}>
                    <Text style={style.text}>Podaj kod</Text>
                    <TextInput style={[stylesApp.input, style.inputText, { borderColor: cvvError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="XXX"
                               value={cvv}
                               onChangeText={validCVV}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               maxLength={3}
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

            <View style={stylesApp.separator} />


            <TouchableOpacity onPress={handleCardPayment} style={stylesApp.whiteButton}>
                <Text style={[stylesApp.whiteButtonText,{ color: colors.appFirstColor}]}>Zapłać kartą</Text>
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


export default CardPayment;
