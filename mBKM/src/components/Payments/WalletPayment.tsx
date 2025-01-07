import React from "react";
import { View,Text,TouchableOpacity,ActivityIndicator } from "react-native";
import Popup from "../Popups/Popup.tsx";
import stylesApp from "../../style/appStyle.js";
import { colors } from "../../style/styleValues.js";
import ProcessingPopup from "../Popups/ProcessingPopup.tsx";
import { useWalletPaymentLogic } from "../../hooks/Payment/useWalletPaymentLogic.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import style from "./style.tsx";

export interface WalletPaymentProps {
    transactionId: string;
    transactionAmount: number;
    userTicketId: string;
    setStopPayment: React.Dispatch<React.SetStateAction<boolean>>;
    setWalletPayment: React.Dispatch<React.SetStateAction<boolean>>;
    closePopup: () => void;
}


const WalletPayment: React.FC<WalletPaymentProps> = (props) => {

    const { wallet, setWallet, token } = useAuth();
    const {
        isLoading,
        showPopup,
        popupText,
        walletStatus,
        confirmValidateTicketPopup,
        confirmWalletPopup,
        showPaymentPopup,
        isProcessing,
        paymentPopupText,
        handleWalletPayment
    } = useWalletPaymentLogic(props, wallet, setWallet, token);

    if (isLoading) {
        return (
            <View style={stylesApp.container}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
    }

    return (
        <View style={style.paymentBox}>
            <Text style={stylesApp.whiteNormalCenterText}>Stan konta: <Text style={stylesApp.boldText}>{wallet?.amount.toFixed(2)} złotych</Text></Text>
            <View style={stylesApp.separator}/>
            <TouchableOpacity onPress={handleWalletPayment} style={stylesApp.whiteButton}>
                <Text style={[stylesApp.whiteButtonText,{ color: colors.appFirstColor }]}>Zapłać z portfela</Text>
            </TouchableOpacity>

            {showPopup && (
                <Popup
                    showPopup={showPopup}
                    message={popupText}
                    confirmationText={"Tak"}
                    cancelText={"Nie"}
                    confirmationAction={ walletStatus ? confirmValidateTicketPopup : confirmWalletPopup}
                    cancelAction={props.closePopup}
                />
            )}

            { showPaymentPopup && (
                <ProcessingPopup
                    showPopup={showPaymentPopup}
                    isProcessing={isProcessing}
                    cancelText={paymentPopupText}
                    cancelAction={props.closePopup}/>
            )}
        </View>
    );
};

export default WalletPayment;
