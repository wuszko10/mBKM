import { useState } from "react";
import { ToastAndroid } from "react-native";
import checkInternetConnection from "../../utils/network.tsx";
import { UserResetPassword,UserRestorePassword } from "../../services/user.service.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";

export const useResetPasswordPopupLogic = (userEmail: string, setShowPopup: (show: boolean) => void, isLogin: boolean) => {

    const navigation = useNavigation<NavigationProp>();

    const [oldPassword,setOldPassword] = useState("");
    const [showOldPassword,setOldShowPassword] = useState(true);
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showConfirmPassword,setShowConfirmPassword] = useState(true);
    const [confirmPasswordError,setConfirmPasswordError] = useState(false);

    function toggleOldPassword() {
        setOldShowPassword(!showOldPassword);
    }
    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function toggleConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    function validateConfirmPassword(input: string) {
        if (input === password) {
            setConfirmPassword(input);
            setConfirmPasswordError(false);
        } else {
            setConfirmPassword(input);
            setConfirmPasswordError(true);
        }
    }

    const cancelAction = () => {
        setShowPopup(false);
        if (!isLogin)
            navigation.goBack();
    }
    const confirmationAction = async () => {
        if ( (isLogin && !oldPassword) || !password || (!confirmPassword && !confirmPasswordError) ) {
            ToastAndroid.show('Uzupełnij wszystkie pola', ToastAndroid.SHORT);
            return;
        }

        if (oldPassword === password) {
            ToastAndroid.show('Stare i nowe hasło jest takie samo.', ToastAndroid.SHORT);
            return;
        }

        checkInternetConnection().then();

        try {

            if (isLogin) {
                const response = await UserResetPassword(userEmail, oldPassword, password);

                if (response) {
                    cancelAction();

                }
            } else {
                const response = await UserRestorePassword(userEmail, password);
                if (response){
                    cancelAction();
                }
            }

        } catch (error) {
            if (error.response.status === 400) {
                ToastAndroid.show('Użytkownik dla podane adresu email nie istnieje.', ToastAndroid.SHORT);
            } else if (error.response.status === 406) {
                ToastAndroid.show('Ostatnie cyfry nr PESEL nie są poprawne.', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Błąd operacji.',ToastAndroid.SHORT);
            }
        }
    }

    return {
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
    }
}
