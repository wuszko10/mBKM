import React,{ useState } from "react";
import { ScrollView,Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationProp } from "../../types/navigation.tsx";
import axios from "axios";
import { SERVER_URL } from "../../../variables.tsx";
import { storage } from "../../../App.tsx";

const Register = () => {

    const navigation = useNavigation<NavigationProp>();

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [pesel,setPesel] = useState("");

    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showConfirmPassword,setShowConfirmPassword] = useState(true);

    const [peselError, setPeselError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);


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

        if (!firstName || !lastName || (!pesel && !peselError) || (!email && !emailError) || !password || (!confirmPassword && !confirmPasswordError) ){
            console.log("Uzupełnij wszystkie pola");
            return;
        }

        try {
            const response = await axios.post(SERVER_URL+'user/create', {
                firstName: firstName,
                lastName: lastName,
                pesel: pesel,
                email: email,
                password: password
            });

            if(response){
                handleChangeRoute();
            }

        } catch (error) {
            if (error.response.status === 400){
                console.log(error);
                console.log('Użytkownik dla podanego nr PESEL lub adresu email istnieje w bazie danych.');
            } else {
                console.log(error);
                console.log("Błąd podczas rejestracji. Spróbuj ponownie");
            }

            // setFirstName('');
            // setLastName('');
            // setPesel('');
            // setEmail('');
            // setPassword('');
            // setConfirmPassword('');
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;

        if (emailRegex.test(input)) {
            setEmail(input);
            setEmailError(false);
        } else {
            setEmail(input);
            setEmailError(true);
        }
    }

    function validateConfirmPassword(input: string) {
        if (input === password){
            setConfirmPassword(input);
            setConfirmPasswordError(false);
        } else {
            setConfirmPassword(input);
            setConfirmPasswordError(true);
        }
    }

    return (
        <ScrollView style={{ backgroundColor: colors.lightBlue }}>
            <View style={stylesApp.loginRegisterContainer}>
                <Text style={stylesApp.h2}>Zarejestruj się</Text>

                <View style={stylesApp.separator}/>

                <View style={stylesApp.gapContainer}>

                    <Text style={stylesApp.h3}>Dane osobowe</Text>

                    <TextInput style={stylesApp.input}
                               placeholder="Imię"
                               value={firstName}
                               onChangeText={setFirstName}
                               autoCapitalize="none"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Nazwisko"
                               value={lastName}
                               onChangeText={setLastName}
                               autoCapitalize="none"
                               placeholderTextColor={colors.darkGray}
                    />

                    <View>
                        <TextInput style={[stylesApp.input, { borderColor: peselError ? 'red' : 'transparent', borderWidth: 1 }]}
                                   placeholder="PESEL"
                                   value={pesel}
                                   onChangeText={validatePesel}
                                   autoCapitalize="none"
                                   keyboardType="numeric"
                                   maxLength={11}
                                   placeholderTextColor={colors.darkGray}
                        />
                    </View>


                    <Text style={stylesApp.h3}>Dane logowania</Text>

                    <TextInput style={[stylesApp.input, { borderColor: emailError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="E-mail"
                               value={email}
                               onChangeText={validateEmail}
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

                    <View>
                        <View style={[stylesApp.input, tw`flex flex-row items-center justify-between`, { borderColor: confirmPasswordError ? 'red' : 'transparent', borderWidth: 1 }]}>
                            <TextInput
                                style={stylesApp.inputText}
                                placeholder="Powtórz hasło"
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
                        {  }
                    </View>


                </View>

                <View style={stylesApp.gapContainer}>
                    <TouchableOpacity onPress={handleRegister} style={stylesApp.mainButton}>
                        <Text style={stylesApp.whiteBoldCenterText}>Zarejestruj się</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={stylesApp.lr_bottomText}>
                            Masz konta w serwisie
                            <Text style={stylesApp.highlightText}> mBKM</Text>
                            ?
                            <Text style={stylesApp.boldText}> Zaloguj się</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );
};

export default Register;
