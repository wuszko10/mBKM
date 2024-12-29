import React,{ useState } from "react";
import { Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { colors } from "../../style/styleValues.js";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonActions,useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext.tsx";
import { SERVER_URL } from "../../../variables.tsx";
import { storage } from "../../../App.tsx";
import { NavigationProp } from "../../types/navigation.tsx";

const Login = () => {

    const navigation = useNavigation<NavigationProp>();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);
    const { setToken, setUser, setUserId, setWallet, userId, token} = useAuth();


    function handleChangeRoute() {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'UserPanel' }],
        }));
    }

    async function handleLogin() {

        if (!username || !password){
            console.log("Uzupełnij wszystkie pola");
            return;
        }

        try {
            const response = await axios.post(SERVER_URL+'user/auth', {
                email: username,
                password: password
            });

            setToken(String(response.data.token.token));
            setUser(response.data.user);
            setUserId(String(response.data.user.id));
            setWallet(response.data.wallet);

            storage.set('token', JSON.stringify(response.data.token));
            storage.set('user', JSON.stringify(response.data.user));
            storage.set('wallet', JSON.stringify(response.data.wallet));

            handleChangeRoute();
        } catch (error) {
            console.error(error);
            setUsername('');
            setPassword('');
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    function handleRegister() {
        navigation.navigate('Register');
    }

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
