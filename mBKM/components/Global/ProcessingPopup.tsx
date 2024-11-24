import { ActivityIndicator,Modal,Text,TouchableOpacity,View } from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import { NavigationProp } from "@react-navigation/native";

type PaymentPopupProps = {
    showPopup: boolean;
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    isProcessing: boolean;
    cancelText: string;
    navigation: NavigationProp<any>;
    cancelAction?: () => void;
}
const ProcessingPopup: React.FC<PaymentPopupProps> = ({
    showPopup,
    setShowPopup,
    isProcessing ,
    cancelText,
    navigation,
    cancelAction
}) => {

    const hidePopup = () => {
        setShowPopup(false);
        navigation.navigate('UserPanel', { screen: 'Tickets'});
    }

    return (
        <Modal
            animationType="fade"
            visible={showPopup}
        >
            <View style={stylesApp.popupContainer}>
                { isProcessing ? (
                    <View>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={stylesApp.whiteNormalCenterText}>Przetwarzanie...</Text>
                    </View>
                ) : (
                    <View style={{gap: 20}}>
                        <Text style={stylesApp.whiteNormalCenterText}>{cancelText}</Text>
                        <TouchableOpacity onPress={cancelAction ? cancelAction : hidePopup} style={stylesApp.whiteButton}>
                            <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>Zakończ</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </Modal>
    );
};
export default ProcessingPopup;
