import React from "react";
import { View,TextInput,Text,TouchableOpacity,StyleSheet } from "react-native";
import ProcessingPopup from "../Global/ProcessingPopup.tsx";
import stylesApp from "../../style/stylesApp.js";
import { colors,dimensions } from "../../style/styleValues.js";
import { useAuth } from "../../context/AuthContext.tsx";
import { useCardPaymentLogic } from "../../hooks/Payment/useCardPaymentLogic.tsx";

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
        <View style={stylesApp.paymentBox}>


                <View style={localStyle.inputBox}>
                    <Text style={localStyle.text}>Numer karty</Text>
                    <TextInput style={[stylesApp.input, localStyle.inputText, { borderColor: cardNumberError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="1234 5678 9012 3456"
                               value={cardNumber}
                               onChangeText={handleCardNumberChange}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               maxLength={19}
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

                <View style={localStyle.inputBox}>
                    <Text style={localStyle.text}>Data{"\n"}ważności</Text>
                    <TextInput style={[stylesApp.input, localStyle.inputText, { borderColor: expiryDateError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="01/29"
                               value={expiryDate}
                               onChangeText={handleExpiryDateChange}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               maxLength={5}
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

                <View style={localStyle.inputBox}>
                    <Text style={localStyle.text}>Podaj kod</Text>
                    <TextInput style={[stylesApp.input, localStyle.inputText, { borderColor: cvvError ? 'red' : 'transparent', borderWidth: 1 }]}
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
