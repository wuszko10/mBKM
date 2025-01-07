import React from "react";
import { View,TextInput,Text,TouchableOpacity } from "react-native";
import stylesApp from "../../style/appStyle.js";
import { colors,dimensions } from "../../style/styleValues.js";
import ProcessingPopup from "../Popups/ProcessingPopup.tsx";
import { useOnlinePaymentLogic } from "../../hooks/Payment/useOnlinePaymentLogic.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import style from "./style.tsx";

export type OnlinePaymentProps = {
    transactionId: string,
    transactionAmount: number;
    userTicketId?: string;
    setStopPayment: React.Dispatch<React.SetStateAction<boolean>>;
    cancelAction: () => void;
}

const OnlinePayment: React.FC<OnlinePaymentProps> = (props) => {

    const { wallet, setWallet, token} = useAuth();
    const {
        code,
        setCode,
        showPopup,
        isProcessing,
        popupText,
        handleOnlinePayment
    } = useOnlinePaymentLogic(props, wallet, setWallet, token);

    return (
        <View style={style.paymentBox}>

            <View style={style.rowContainerPayment}>
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
                <Text style={[stylesApp.whiteButtonText,{ color: colors.appFirstColor}]}>Zapłać</Text>
            </TouchableOpacity>

            { showPopup && (
                <ProcessingPopup
                    showPopup={showPopup}
                    isProcessing={isProcessing}
                    cancelText={popupText}
                    cancelAction={props.cancelAction}
                />
            )}
        </View>
    );
};

export default OnlinePayment;
