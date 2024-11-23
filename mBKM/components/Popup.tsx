import { Modal,Text,TouchableOpacity,View } from "react-native";
import React from "react";
import stylesApp from "../style/stylesApp.js";
import { colors } from "../style/styleValues.js";

type PopupProps = {
    showPopup: boolean;
    message: string;
    confirmationText: string,
    cancelText: string,
    confirmationAction: () => void;
    cancelAction: () => void;
}
const Popup: React.FC<PopupProps> = (
    {
        showPopup,
        message,
        confirmationText,
        cancelText,
        confirmationAction,
        cancelAction
    }
) => {

    return (
        <Modal
            animationType="fade"
            visible={showPopup}
        >
            <View style={stylesApp.popupContainer}>
                <Text style={stylesApp.popupText}>{message}</Text>
                <View style={stylesApp.rowContainer}>
                    <TouchableOpacity onPress={cancelAction} style={stylesApp.popupBtn}>
                        <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>{cancelText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={confirmationAction} style={stylesApp.popupBtn}>
                        <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>{confirmationText}</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </Modal>
    )
}

export default Popup;
