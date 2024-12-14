import { FlatList,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { colors,dimensions } from "../../style/styleValues.js";
import Entypo from "react-native-vector-icons/Entypo";
import React from "react";
import { PaymentMethod } from "../../types/interfaces.tsx";
import stylesApp from "../../style/stylesApp.js";


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
        <View style={localStyle.box}>

            { methods && methods.map(method => (
                <TouchableOpacity key={method.id} style={localStyle.methodBox} onPress={() => handlePaymentMethod(method.id)}>
                    <Entypo name={method.entypoIcon} size={24} style={ paymentMethodId === method.id ? {color: colors.textColorBlack} : {color: colors.darkGray }} />
                    <Text style={ paymentMethodId === method.id ? {color: colors.textColorBlack} : {color: colors.darkGray }}>{method.label}</Text>
                </TouchableOpacity>
            ))}

        </View>
    )
}

const localStyle = StyleSheet.create({
    box: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    methodBox: {
        flexGrow: 0.5,
        flexShrink: 0.5,
        flexBasis: 100,
        height: 80,
        gap: 4,
        borderRadius: dimensions.radius,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.appThirdColor,
    },
})

export default PaymentSelector;
