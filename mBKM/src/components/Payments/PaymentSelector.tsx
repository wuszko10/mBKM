import { Text,TouchableOpacity,View } from "react-native";
import { colors } from "../../style/styleValues.js";
import Entypo from "react-native-vector-icons/Entypo";
import React from "react";
import { PaymentMethod } from "../../types/interfaces.tsx";
import style from "./style.tsx";


type PaymentSelectorProps = {
    paymentMethodId: string;
    setPaymentMethodId: React.Dispatch<React.SetStateAction<string>>;
    methods: PaymentMethod[] | undefined;
};
const PaymentSelector: React.FC<PaymentSelectorProps> = (
    {
        paymentMethodId,
        setPaymentMethodId,
        methods
    }) => {

    const handlePaymentMethod = (id: string) => {
        setPaymentMethodId(id);
    }

    return (
        <View style={style.box}>

            { methods && methods.map(method => (
                <TouchableOpacity key={method.id} style={style.methodBox} onPress={() => handlePaymentMethod(method.id)}>
                    <Entypo name={method.entypoIcon} size={24} style={ paymentMethodId === method.id ? {color: colors.textColorBlack} : {color: colors.darkGray }} />
                    <Text style={ paymentMethodId === method.id ? {color: colors.textColorBlack} : {color: colors.darkGray }}>{method.label}</Text>
                </TouchableOpacity>
            ))}

        </View>
    )
}


export default PaymentSelector;
