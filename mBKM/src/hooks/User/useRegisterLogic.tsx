import { useState } from "react";
import { userRegister } from "../../services/user.service.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import checkInternetConnection from "../../utils/network.tsx";
import { ToastAndroid } from "react-native";
import {EMAIL_REGEX, formatPostalCode, PESEL_REGEX, POSTAL_CODE_REGEX} from "../../utils/validForms.tsx";

export const useRegisterLogic = () => {
    const navigation = useNavigation<NavigationProp>();

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [pesel,setPesel] = useState("");

    const [fullAddress, setFullAddress] = useState('');
    const [town, setTown] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [postal, setPostal] = useState('');

    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showConfirmPassword,setShowConfirmPassword] = useState(true);

    const [peselError,setPeselError] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [confirmPasswordError,setConfirmPasswordError] = useState(false);
    const [postalCodeError,setPostalCodeError] = useState(false);

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function toggleConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    function handleChangeRoute() {
        navigation.navigate("Login");
    }

    async function handleRegister() {

        if (!firstName || !lastName || (!pesel && !peselError) || (!email && !emailError) || !password || (!confirmPassword && !confirmPasswordError) || !fullAddress || !postalCode || !postal) {
            ToastAndroid.show('Uzupełnij wszystkie pola', ToastAndroid.SHORT);
            return;
        }

        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            return;
        }

        try {

            const response = await userRegister(firstName,lastName,pesel,email,password,fullAddress,town,postalCode,postal);

            if (response) {
                handleChangeRoute();
            }

        } catch (error) {
            if (error.response.status === 400) {
                ToastAndroid.show('Użytkownik dla podanego nr PESEL lub adresu email istnieje w bazie danych.', ToastAndroid.SHORT);
                setPesel('');
                setEmail('');

            } else {
                ToastAndroid.show('Błąd podczas rejestracji. Spróbuj ponownie', ToastAndroid.SHORT);

                setFirstName('');
                setLastName('');
                setPesel('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        }

    }

    function handleLogin() {
        navigation.navigate("Login");
    }

    function validatePesel(input: string) {

        if (PESEL_REGEX.test(input)) {
            setPesel(input);
            setPeselError(false);
        } else {
            setPesel(input);
            setPeselError(true);
        }
    }

    function validateEmail(input: string) {

        if (EMAIL_REGEX.test(input)) {
            setEmail(input);
            setEmailError(false);
        } else {
            setEmail(input);
            setEmailError(true);
        }
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

    const validPostalCode = (input: string) => {
        const formatted = formatPostalCode(input);

        if (POSTAL_CODE_REGEX.test(formatted)) {
            setPostalCode(formatted);
            setPostalCodeError(false);
        } else {
            setPostalCode(formatted);
            setPostalCodeError(true);
        }
    }

    return {
        firstName,
        lastName,
        email,
        pesel,
        password,
        confirmPassword,
        fullAddress,
        town,
        postalCode,
        postal,
        showPassword,
        showConfirmPassword,
        peselError,
        emailError,
        confirmPasswordError,
        postalCodeError,
        setFirstName,
        setLastName,
        setPassword,
        setFullAddress,
        setTown,
        setPostal,
        togglePassword,
        toggleConfirmPassword,
        handleRegister,
        handleLogin,
        validatePesel,
        validateEmail,
        validateConfirmPassword,
        validPostalCode,
    };
}
