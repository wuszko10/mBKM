import React from "react";
import { Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/appStyle.js";
import style from './style.tsx'
import { colors } from "../../style/styleValues.js";
import ResetPasswordPopup from "../../components/Popups/ResetPasswordPopup.tsx";
import { useResetPasswordLogic } from "../../hooks/User/useResetPasswordLogic.tsx";

const ResetPassword = () => {

    const {
        username,
        setUsername,
        checkPesel,
        setCheckPesel,
        handleRegister,
        handleCheck,
        showPopup,
        setShowPopup,
    } = useResetPasswordLogic();


    return (
        <View style={style.loginRegisterContainer}>
            <Text style={style.h2}>Przywracanie hasła</Text>

            <View style={stylesApp.separator}/>

            <View style={style.gapContainer}>
                <TextInput style={stylesApp.input}
                           placeholder="E-mail"
                           value={username}
                           onChangeText={setUsername}
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="5 ostatnich cyfry PESEL"
                           value={checkPesel}
                           onChangeText={setCheckPesel}
                           autoCapitalize="none"
                           keyboardType="numeric"
                           maxLength={5}
                           placeholderTextColor={colors.darkGray}
                />

                <View style={stylesApp.separator}/>

                <TouchableOpacity onPress={handleCheck} style={stylesApp.mainButton}>
                    <Text style={stylesApp.whiteBoldCenterText}>Resetuj hasło</Text>
                </TouchableOpacity>
            </View>

            <View style={style.gapContainer}>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={style.lr_bottomText}>
                        Nie masz konta w serwisie
                        <Text style={style.highlightText}> mBKM</Text>
                        ?
                        <Text style={stylesApp.boldText}> Załóż konto</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            <ResetPasswordPopup
                showPopup={showPopup}
                userEmail={username}
                setShowPopup={setShowPopup}
                isLogin={false}
            />

        </View>
    );
};


export default ResetPassword;
