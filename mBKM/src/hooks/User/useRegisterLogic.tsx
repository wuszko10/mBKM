import { useState } from "react";
import { userRegister } from "../../services/user.service.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";

export const useRegisterLogic = () => {
    const navigation = useNavigation<NavigationProp>();

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [pesel,setPesel] = useState("");

    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showConfirmPassword,setShowConfirmPassword] = useState(true);

    const [peselError,setPeselError] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [confirmPasswordError,setConfirmPasswordError] = useState(false);

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

        if (!firstName || !lastName || (!pesel && !peselError) || (!email && !emailError) || !password || (!confirmPassword && !confirmPasswordError)) {
            console.log("Uzupełnij wszystkie pola");
            return;
        }

        try {

            const response = await userRegister(firstName,lastName,pesel,email,password);

            if (response) {
                handleChangeRoute();
            }

        } catch (error) {
            if (error.response.status === 400) {
                console.log(error);
                console.log('Użytkownik dla podanego nr PESEL lub adresu email istnieje w bazie danych.');
                setPesel('');
                setEmail('');

            } else {
                console.log(error);
                console.log("Błąd podczas rejestracji. Spróbuj ponownie");

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
        const peselRegex = /^[0-9]{2}((0[1-9]|1[0-2])|(2[1-9]|3[0-2]))(0[1-9]|1[0-9]|2[0-9]|3[01])[0-9]{5}$/gm;

        if (peselRegex.test(input)) {
            setPesel(input);
            setPeselError(false);
        } else {
            setPesel(input);
            setPeselError(true);
        }
    }

    function validateEmail(input: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(input)) {
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

    return {
        firstName,
        lastName,
        email,
        pesel,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        peselError,
        emailError,
        confirmPasswordError,
        setFirstName,
        setLastName,
        setEmail,
        setPesel,
        setPassword,
        setConfirmPassword,
        setShowPassword,
        setShowConfirmPassword,
        setPeselError,
        setEmailError,
        setConfirmPasswordError,
        togglePassword,
        toggleConfirmPassword,
        handleRegister,
        handleLogin,
        validatePesel,
        validateEmail,
        validateConfirmPassword,
    };
}
