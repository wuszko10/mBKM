import React,{ useState } from "react";
import { SafeAreaView,ScrollView,Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../style/stylesApp.js";
import { colors } from "../style/styleValues.js";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header.tsx";

const Profile = () => {

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

    function togglePassword() {
        setShowPassword(!showPassword);
    }

    return (
        <SafeAreaView style={stylesApp.container}>

            <Header title="Mój profil"/>

            <View style={[{backgroundColor: 'red'}]}>

                <ScrollView>
                    <View style={stylesApp.gapContainer}>

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

                        <TextInput style={stylesApp.input}
                                   placeholder="PESEL"
                                   value={pesel}
                                   onChangeText={setPesel}
                                   autoCapitalize="none"
                                   keyboardType="numeric"
                                   placeholderTextColor={colors.textColorGray}
                        />



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
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

export default Profile;
