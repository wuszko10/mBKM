import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import {useAddressUpdateLogic} from "../../hooks/User/useAddressUpdateLogic.tsx";

type PopupProps = {
    showPopup: boolean;
    setShowPopup: (showPopup: boolean) => void;
}
const UpdateAddressPopupForm: React.FC<PopupProps> = (
    {
        showPopup,
        setShowPopup,
    }
) => {

    const {
        fullAddress,
        town,
        postalCode,
        postal,
        postalCodeError,
        setFullAddress,
        setTown,
        setPostal,
        validPostalCode,
        confirmationAction,
        cancelAction,
    } = useAddressUpdateLogic(setShowPopup);

    return (
        <Modal
            animationType="fade"
            visible={showPopup}
            onDismiss={cancelAction}
        >
            <View style={stylesApp.popupContainer}>
                <Text style={stylesApp.popupText}>Zmień dane adresowe</Text>
                <TextInput style={stylesApp.input}
                           placeholder="np. Tarnowska 5/12 lub np. Błonie 33"
                           value={fullAddress}
                           onChangeText={setFullAddress}
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Tarnów (nieobowiązkowe)"
                           value={town}
                           onChangeText={setTown}
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />

                <TextInput style={[stylesApp.input, { borderColor: postalCodeError ? 'red' : 'transparent', borderWidth: 1 }]}
                           placeholder="33-100"
                           value={postalCode}
                           onChangeText={validPostalCode}
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Tarnów"
                           value={postal}
                           onChangeText={setPostal}
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />

                <View style={stylesApp.rowContainer}>
                    <TouchableOpacity onPress={confirmationAction} style={stylesApp.popupBtn}>
                        <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>Zmień</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelAction} style={stylesApp.popupBtn}>
                        <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>Powrót</Text>
                    </TouchableOpacity> //zmienić styl. Transarentne tło, sam kolor tekstu
                </View>

            </View>

        </Modal>
    )
}

export default UpdateAddressPopupForm;
