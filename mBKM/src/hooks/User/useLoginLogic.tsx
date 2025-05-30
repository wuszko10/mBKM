import { CommonActions,useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { useState } from "react";
import { storage } from "../../../App.tsx";
import { ToastAndroid } from "react-native";
import checkInternetConnection from "../../utils/network.tsx";
import { userLogin } from "../../services/user.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export const useLoginLogic = () => {

    const navigation = useNavigation<NavigationProp>();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);


    const { setToken, setUser, setUserId, setWallet, setAddress } = useAuth();

    function handleChangeRoute() {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'UserPanel' }],
        }));
    }

    async function handleLogin() {

        if (!username || !password){
            ToastAndroid.show('Uzupełnij wszystkie pola', ToastAndroid.SHORT);
            return;
        }

        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            return;
        }

        try {
            const response = await userLogin(username, password);

            setToken(String(response.token.token));
            setUser(response.user);
            setUserId(String(response.user.id));
            setWallet(response.wallet);
            setAddress(response.address);

            storage.set('token', JSON.stringify(response.token));
            storage.set('user', JSON.stringify(response.user));
            storage.set('wallet', JSON.stringify(response.wallet));
            storage.set('address', JSON.stringify(response.address));

            handleChangeRoute();
        } catch (error) {
            ToastAndroid.show('Błąd podczas logowania', ToastAndroid.SHORT);
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

    function handleReset() {
        navigation.navigate('ResetPassword');
    }

    return {
        username,
        setUsername,
        password,
        showPassword,
        setPassword,
        togglePassword,
        handleLogin,
        handleRegister,
        handleReset
    };

}
