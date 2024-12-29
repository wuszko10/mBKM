import React from "react";
import { Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { colors } from "../../style/styleValues.js";
import { useAuth } from "../../context/AuthContext.tsx";
import { useLoginLogic } from "../../hooks/User/useLoginLogic.tsx";

const Login = () => {



    const {
        username,
        setUsername,
        password,
        showPassword,
        setPassword,
        togglePassword,
        handleLogin,
        handleRegister
    } = useLoginLogic();


    return (
        <View style={stylesApp.loginRegisterContainer}>
            <Text style={stylesApp.h2}>Zaloguj się</Text>

            <View style={stylesApp.separator}/>

            <View style={stylesApp.gapContainer}>
                <TextInput style={stylesApp.input}
                           placeholder="Login"
                           value={username}
                           onChangeText={setUsername}
                           autoCapitalize="none"
                           placeholderTextColor={colors.darkGray}
                />

                <View style={[stylesApp.input,tw`flex flex-row items-center justify-between`]}>
                    <TextInput
                        style={stylesApp.inputText}
                        placeholder="Hasło"
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

            </View>

            <View style={stylesApp.gapContainer}>
                <TouchableOpacity onPress={handleLogin} style={stylesApp.mainButton}>
                    <Text style={stylesApp.whiteBoldCenterText}>Zaloguj się</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={stylesApp.lr_bottomText}>
                        Nie masz konta w serwisie
                        <Text style={stylesApp.highlightText}> mBKM</Text>
                        ?
                        <Text style={stylesApp.boldText}> Załóż konto</Text>
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};


export default Login;
