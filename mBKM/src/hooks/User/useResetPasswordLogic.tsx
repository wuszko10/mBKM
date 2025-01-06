import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { ToastAndroid } from "react-native";
import checkInternetConnection from "../../utils/network.tsx";
import { UserResetPasswordCheck } from "../../services/user.service.tsx";

export const useResetPasswordLogic = () => {

    const navigation = useNavigation<NavigationProp>();

    const [username,setUsername] = useState('');
    const [checkPesel,setCheckPesel] = useState('');
    const [showPopup,setShowPopup] = useState(false);

    function handleRegister() {
        navigation.navigate("Register");
    }

    const handleCheck = async () => {
        if (!username || !checkPesel) {
            ToastAndroid.show('Uzupełnij wszystkie pola', ToastAndroid.SHORT);
            return;
        }

        checkInternetConnection().then();

        try {
            const response = await UserResetPasswordCheck(username, checkPesel);

            if (response) {
                setShowPopup(true);
            }
        } catch (error) {
            if (error.response.status === 400) {
                ToastAndroid.show('Użytkownik dla podane adresu email nie istnieje.', ToastAndroid.SHORT);
            } else if (error.response.status === 406) {
                ToastAndroid.show('Ostatnie cyfry nr PESEL nie są poprawne.', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Błąd operacji.',ToastAndroid.SHORT);
            }
        }
    }

    return {
        username,
        setUsername,
        checkPesel,
        setCheckPesel,
        handleRegister,
        handleCheck,
        showPopup,
        setShowPopup,
    }

}
