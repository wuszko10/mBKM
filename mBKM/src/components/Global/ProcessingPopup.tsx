import { ActivityIndicator,Modal,Text,TouchableOpacity,View } from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import { NavigationProp } from "@react-navigation/native";

type PaymentPopupProps = {
    showPopup: boolean;
    isProcessing: boolean;
    cancelText: string;
    cancelAction: () => void;
}
const ProcessingPopup: React.FC<PaymentPopupProps>  = (props) => {


    return (
        <Modal
            animationType="fade"
            visible={props.showPopup}
        >
            <View style={stylesApp.popupContainer}>
                { props.isProcessing ? (
                    <View>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={stylesApp.whiteNormalCenterText}>Przetwarzanie...</Text>
                    </View>
                ) : (
                    <View style={{gap: 20}}>
                        <Text style={[stylesApp.popupText,{ color: colors.appWhite}]}>{props.cancelText}</Text>
                        <TouchableOpacity onPress={props.cancelAction} style={stylesApp.whiteButton}>
                            <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>Zakończ</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </Modal>
    );
};
export default ProcessingPopup;
