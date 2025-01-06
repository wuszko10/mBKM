import React from "react";
import { ScrollView,Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import style from './style.tsx'
import { colors } from "../../style/styleValues.js";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRegisterLogic } from "../../hooks/User/useRegisterLogic.tsx";

const Register = () => {

    const {
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
    } = useRegisterLogic();

    return (
        <ScrollView style={{ backgroundColor: colors.lightBlue }}>
            <View style={style.loginRegisterContainer}>
                <Text style={style.h2}>Zarejestruj się</Text>

                <View style={stylesApp.separator}/>

                <View style={style.gapContainer}>


                    <Text style={stylesApp.normalH3}>Dane osobowe</Text>

                    <TextInput style={stylesApp.input}
                               placeholder="Imię"
                               value={firstName}
                               onChangeText={setFirstName}
                               autoCapitalize="sentences"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Nazwisko"
                               value={lastName}
                               onChangeText={setLastName}
                               autoCapitalize="sentences"
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

                    <Text style={[stylesApp.normalH3, {paddingTop: 20}]}>Dane adresowe</Text>

                    <TextInput style={stylesApp.input}
                               placeholder="Ulica np. Tarnowska 5/12"
                               value={fullAddress}
                               onChangeText={setFullAddress}
                               autoCapitalize="sentences"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Miejscowość (nieobowiązkowe)"
                               value={town}
                               onChangeText={setTown}
                               autoCapitalize="sentences"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={[stylesApp.input, { borderColor: postalCodeError ? 'red' : 'transparent', borderWidth: 1 }]}
                               placeholder="Kod pocztowy"
                               value={postalCode}
                               onChangeText={validPostalCode}
                               maxLength={6}
                               keyboardType="numeric"
                               autoCapitalize="none"
                               placeholderTextColor={colors.darkGray}
                    />

                    <TextInput style={stylesApp.input}
                               placeholder="Poczta"
                               value={postal}
                               onChangeText={setPostal}
                               autoCapitalize="sentences"
                               placeholderTextColor={colors.darkGray}
                    />


                    <Text style={[stylesApp.normalH3, {paddingTop: 20}]}>Dane logowania</Text>

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

                <View style={[style.gapContainer,{ paddingTop: 20}]}>
                    <TouchableOpacity onPress={handleRegister} style={stylesApp.mainButton}>
                        <Text style={stylesApp.whiteBoldCenterText}>Zarejestruj się</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={style.lr_bottomText}>
                            Masz konta w serwisie
                            <Text style={style.highlightText}> mBKM</Text>
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
