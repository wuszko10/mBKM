import React,{ useState } from "react";
import { Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { colors } from "../../style/styleValues.js";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../components/Global/AuthContext.tsx";
import { SERVER_URL } from "../../repositories/variables.tsx";

type RootStackPramList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    UserPanel: undefined;
}

type NavigationProp = StackNavigationProp<RootStackPramList>
const Login = () => {

    const navigation = useNavigation<NavigationProp>();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);
    const { setToken } = useAuth();


    function handleChangeRoute() {
        navigation.navigate("UserPanel");
    }

    async function handleLogin() {

        if (!username || !password){
            console.log("Login and password are required")
        }

        try {
            const response = await axios.post(SERVER_URL+'user/auth', {
                login: username,
                password: password
            });

            await AsyncStorage.setItem('token', response.data.token);
            setToken(response.data.token);

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
                           placeholderTextColor={colors.gray}
                />

                <View style={[stylesApp.input,tw`flex flex-row items-center justify-between`]}>
                    <TextInput
                        style={stylesApp.inputText}
                        placeholder="Hasło"
                        value={password}
                        autoCapitalize="none"
                        secureTextEntry={showPassword}
                        placeholderTextColor={colors.gray}
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
