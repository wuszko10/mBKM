import React,{ useState } from "react";
import { ScrollView,Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
const Register = () => {

    const navigation = useNavigation<NavigationProp>();

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [pesel,setPesel] = useState("");

    const [streetName,setStreetName] = useState("");
    const [streetNumber,setStreetNumber] = useState("");
    const [apartmentNumber,setApartmentNumber] = useState("");
    const [postalCode,setPostalCode] = useState("");
    const [town,setTown] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(true);
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showConfirmPassword,setShowConfirmPassword] = useState(true);

    const [peselError, setPeselError] = useState("");


    function togglePassword() {
        setShowPassword(!showPassword);
    }

    function toggleConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    function handleLogin() {
        navigation.navigate("Login");
    }

    function handleRegister() {

    }

    function validatePesel() {
        setPeselError(pesel);
/*        const reg = /^[0-9]{11}$/;

        if (!reg.test(value)) {
            setPeselError("Niepoprawny numer PESEL");
        } else {
            const digits = value.split('').map(Number);

            const day = parseInt(value.substring(4, 6), 10);
            const month = parseInt(value.substring(2, 4), 10);

            if (day > 31 || month > 12) {
                return false;
            }

            const checksum = (digits[0] + 3 * digits[1] + 7 * digits[2] + 9 * digits[3] + digits[4] + 3 * digits[5] + 7 * digits[6] + 9 * digits[7] + digits[8] + 3 * digits[9]) % 10;

            const controlNumber = checksum === 0 ? 0 : 10 - checksum;

            if (digits[10] === controlNumber) {
                setPesel(pesel);
                setPeselError("");
            } else {
                setPeselError("Niepoprawny numer PESEL");
            }
        }*/
    }

    return (
        <ScrollView>
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
                               placeholderTextColor={colors.textColorGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Nazwisko"
                               value={lastName}
                               onChangeText={setLastName}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <View>
                        <TextInput style={stylesApp.input}
                                   placeholder="PESEL"
                                   value={pesel}
                                   onChangeText={validatePesel}
                                   autoCapitalize="none"
                                   keyboardType="numeric"
                                   placeholderTextColor={colors.textColorGray}
                        />
                        {/* Display an error message if the PESEL is invalid */}
                        {peselError ? (
                            <Text style={stylesApp.inputError}>{peselError}</Text>
                        ) : null}
                    </View>



                    <Text style={stylesApp.h3}>Dane kontaktowe</Text>

                    <TextInput style={stylesApp.input}
                               placeholder="Ulica"
                               value={streetName}
                               onChangeText={setStreetName}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Numer domu"
                               value={streetNumber}
                               onChangeText={setStreetNumber}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Numer mieszkania"
                               value={apartmentNumber}
                               onChangeText={setApartmentNumber}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Kod pocztowy"
                               value={postalCode}
                               onChangeText={setPostalCode}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Miejscowość"
                               value={town}
                               onChangeText={setTown}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Numer telefonu"
                               value={phoneNumber}
                               onChangeText={setPhoneNumber}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <Text style={stylesApp.h3}>Dane logowania</Text>

                    <TextInput style={stylesApp.input}
                               placeholder="email"
                               value={email}
                               onChangeText={setEmail}
                               autoCapitalize="none"
                               placeholderTextColor={colors.textColorGray}
                    />

                    <View style={[stylesApp.input,tw`flex flex-row items-center justify-between`]}>
                        <TextInput
                            style={stylesApp.inputText}
                            placeholder="Hasło"
                            value={password}
                            autoCapitalize="none"
                            secureTextEntry={showPassword}
                            placeholderTextColor={colors.textColorGray}
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

                    <View style={[stylesApp.input,tw`flex flex-row items-center justify-between`]}>
                        <TextInput
                            style={stylesApp.inputText}
                            placeholder="Powtórz hasło"
                            value={confirmPassword}
                            autoCapitalize="none"
                            secureTextEntry={showConfirmPassword}
                            placeholderTextColor={colors.textColorGray}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />

                        <TouchableOpacity onPress={toggleConfirmPassword}>
                            {showPassword?(
                                <Icon name="eye" style={stylesApp.icon} />
                            ):(
                                <Icon name="eye-slash" style={stylesApp.icon} />
                            )}
                        </TouchableOpacity>
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
