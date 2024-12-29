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
        setCardNumber,
        expiryDate,
        setExpiryDate,
        cvv,
        setCvv,
        handleCardPayment,
        showPopup,
        isProcessing,
        popupText
    } = useCardPaymentLogic(props, wallet, setWallet, token);

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
