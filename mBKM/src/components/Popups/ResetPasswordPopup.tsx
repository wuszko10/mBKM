import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import { useResetPasswordPopupLogic } from "../../hooks/User/useResetPasswordPopupLogic.tsx";
import style from "./style.tsx";

type PopupProps = {
    showPopup: boolean;
    userEmail: string;
    setShowPopup: (showPopup: boolean) => void;
    isLogin: boolean;
}
const ResetPasswordPopup: React.FC<PopupProps> = (
    {
        showPopup,
        userEmail,
        setShowPopup,
        isLogin,
    }
) => {

    const {
        oldPassword,
        showOldPassword,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        confirmPasswordError,
        setOldPassword,
        setPassword,
        toggleOldPassword,
        togglePassword,
        toggleConfirmPassword,
        validateConfirmPassword,
        confirmationAction,
        cancelAction,
    } = useResetPasswordPopupLogic(userEmail, setShowPopup, isLogin);

    return (
        <Modal
            animationType="fade"
            visible={showPopup}
            onRequestClose={cancelAction}
        >
            <View style={stylesApp.fullBlueContainer}>
                <Text style={style.popupText}>Zmień hasło dla konta{'\n'}{userEmail}</Text>
                <View style={stylesApp.separator}/>
                <View style={style.inputsContainer}>
                    { isLogin &&
                        <View style={[stylesApp.input,tw`flex flex-row items-center justify-between`]}>
                            <TextInput
                                style={stylesApp.inputText}
                                placeholder="Obecne hasło"
                                value={oldPassword}
                                autoCapitalize="none"
                                secureTextEntry={showOldPassword}
                                placeholderTextColor={colors.darkGray}
                                onChangeText={(text) => setOldPassword(text)}
                            />

                            <TouchableOpacity onPress={toggleOldPassword}>
                                {showPassword?(
                                    <Icon name="eye" style={stylesApp.icon} />
                                ):(
                                    <Icon name="eye-slash" style={stylesApp.icon} />
                                )}
                            </TouchableOpacity>
                        </View>
                    }

                    <View style={[stylesApp.input,tw`flex flex-row items-center justify-between`]}>
                        <TextInput
                            style={stylesApp.inputText}
                            placeholder="Nowe hasło"
                            value={password}
                            autoCapitalize="none"
                            secureTextEntry={showPassword}
                            placeholderTextColor={colors.darkGray}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity onPress={togglePassword}>
                            {showPassword?(
                                <Icon name="eye" style={stylesApp.icon} />
                            ):(
                                <Icon name="eye-slash" style={stylesApp.icon} />
                            )}
                        </TouchableOpacity>
                    </View>


                    <View>
                        <View style={[stylesApp.input, tw`flex flex-row items-center justify-between`, { borderColor: confirmPasswordError ? 'red' : 'transparent', borderWidth: 1 }]}>
                            <TextInput
                                style={stylesApp.inputText}
                                placeholder="Powtórz nowe hasło"
                                value={confirmPassword}
                                autoCapitalize="none"
                                secureTextEntry={showConfirmPassword}
                                placeholderTextColor={colors.darkGray}
                                onChangeText={(text) => validateConfirmPassword(text)}
                            />

                            <TouchableOpacity onPress={toggleConfirmPassword}>
                                {showConfirmPassword?(
                                    <Icon name="eye" style={stylesApp.icon} />
                                ):(
                                    <Icon name="eye-slash" style={stylesApp.icon} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={stylesApp.separator}/>
                <View style={style.buttonsContainer}>
                    <TouchableOpacity onPress={confirmationAction} style={style.popupBtn}>
                        <Text style={[stylesApp.whiteButtonText,{ color: colors.appFirstColor }]}>Zmień hasło</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={cancelAction} style={style.secPopupBtn}>
                    <Text style={stylesApp.whiteButtonText}>Powrót</Text>
                </TouchableOpacity>
                </View>

            </View>

        </Modal>
    )
}

export default ResetPasswordPopup;
