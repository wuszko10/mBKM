import { Modal,Text,TouchableOpacity,View } from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import style from "./style.tsx";

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
            <View style={stylesApp.fullBlueContainer}>
                <Text style={style.popupText}>{message}</Text>
                <View style={stylesApp.separator}/>
                <View style={style.buttonsContainer}>
                    <TouchableOpacity onPress={confirmationAction} style={style.popupBtn}>
                        <Text style={[stylesApp.whiteButtonText,{ color: colors.appFirstColor }]}>{confirmationText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelAction} style={style.secPopupBtn}>
                        <Text style={stylesApp.whiteButtonText}>{cancelText}</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </Modal>
    )
}

export default Popup;
