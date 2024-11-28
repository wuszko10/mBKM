import { Modal,Text,TextInput,TouchableOpacity,View } from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";

type Props = {
    showPopup: boolean;
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}
const ChangePasswordPopup: React.FC<Props> = (props) => {


    return (
        <Modal
            animationType="fade"
            visible={props.showPopup}
            onRequestClose={() => props.setShowPopup(!props.showPopup)}
        >
            <View style={[stylesApp.popupContainer,{ gap: 5 }]}>
                <View style={stylesApp.input}>
                    <TextInput
                        style={stylesApp.inputText}
                        placeholder="Hasło"
                        value={props.password}
                        autoCapitalize="none"
                        placeholderTextColor={colors.gray}
                        onChangeText={(text) => props.setPassword(text)}
                    />
                </View>

                <TouchableOpacity onPress={() => props.setShowPopup(!props.showPopup)}>
                    <Text>Zapisz</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );

};

export default ChangePasswordPopup;
