import { ActivityIndicator,Modal,Text,TouchableOpacity,View } from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import style from "./style.tsx";

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
            <View style={stylesApp.fullBlueContainer}>
                { props.isProcessing ? (
                    <View>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={style.popupText}>Przetwarzanie...</Text>
                    </View>
                ) : (
                    <View style={{gap: 20}}>
                        <Text style={style.popupText}>{props.cancelText}</Text>
                        <View style={stylesApp.separator}/>
                        <TouchableOpacity onPress={props.cancelAction} style={stylesApp.whiteButton}>
                            <Text style={[stylesApp.whiteButtonText,{ color: colors.appFirstColor }]}>Zakończ</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </Modal>
    );
};
export default ProcessingPopup;
