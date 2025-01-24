import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import stylesApp from "../../style/appStyle.js";
import { colors } from "../../style/styleValues.js";
import {useAddressUpdateLogic} from "../../hooks/User/useAddressUpdateLogic.tsx";
import style from "./style.tsx";

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
            onRequestClose={cancelAction}
        >
            <View style={stylesApp.fullBlueContainer}>
                <Text style={style.popupText}>Zmień dane adresowe</Text>
                <View style={stylesApp.separator}/>
                <View style={style.inputsContainer}>
                    <TextInput style={stylesApp.input}
                               placeholder="Ulica np. Tarnowska 5/12"
                               value={fullAddress}
                               onChangeText={setFullAddress}
                               autoCapitalize="sentences"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Miejscowość (nieobowiązkowe)"
                               value={town}
                               onChangeText={setTown}
                               autoCapitalize="sentences"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={[stylesApp.input, { borderColor: postalCodeError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="Kod pocztowy"
                               value={postalCode}
                               onChangeText={validPostalCode}
                               maxLength={6}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Poczta"
                               value={postal}
                               onChangeText={setPostal}
                               autoCapitalize="sentences"
                               placeholderTextColor={colors.darkGray}
                    />
                </View>

                <View style={stylesApp.separator}/>

                <View style={style.buttonsContainer}>
                    <TouchableOpacity onPress={confirmationAction} style={style.popupBtn}>
                        <Text style={[stylesApp.whiteButtonText,{ color: colors.appFirstColor }]}>Zmień</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={cancelAction} style={style.secPopupBtn}>
                        <Text style={stylesApp.whiteButtonText}>Powrót</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </Modal>
    )
}

export default UpdateAddressPopupForm;
