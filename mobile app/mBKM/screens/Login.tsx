import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ToastAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../styles/styleApp';
import {colors, dimensions} from '../styles/styleValues.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
//import {useAuth} from '../components/AuthProvider.tsx';
import NetInfo from '@react-native-community/netinfo';
//import CinemaRepository from '../repositories/CinemaRepository.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    ForgotPass: undefined;
    ForgotEmail: undefined;
    Register: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;



const Login = () => {
    const navigation = useNavigation<NavigationProp>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    //const { loginProvider } = useAuth();

    const handleLogin = async () => {
        /*try {
            const netInfo = await NetInfo.fetch();
            if (!netInfo.isConnected) {
                throw new Error('Brak połączenia z internetem');
            }

            if (!username || !password ) {
                throw new Error('Uzupełnij wszystkie dane');
            }

            const response = await CinemaRepository.login(username, password);

            if (response) {

                await AsyncStorage.setItem('userData', JSON.stringify(response));

                setUsername('');
                setPassword('');

                await loginProvider();

                navigation.navigate('Home');
            } else {
                throw new Error('Błędne dane logowania');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorObject = error as Error;

                if (errorObject.message === 'Brak połączenia z internetem') {
                    ToastAndroid.show('Brak połączenia z internetem', ToastAndroid.SHORT);
                } else if (errorObject.message === 'Uzupełnij wszystkie dane') {
                    ToastAndroid.show('Uzupełnij wszystkie dane', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Błędne dane logowania', ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show('Błędne logowanie', ToastAndroid.SHORT);
            }
        }*/
    };
    const handleRegister = () => {
        navigation.navigate('Register');
    };
    const handleForgotPassword = () => {
        navigation.navigate('ForgotEmail');
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View /*style={styles.loginRegisterContainer}*/>
            <View /*style={styles.gapContainer}*/>
                <View /*style={styles.welcomeDiv}*/>
                    <Text /*style={styles.textHeader}*/>Witaj!</Text>
                    <Text /*style={styles.grayTextHeader}*/>Proszę się zalogować</Text>
                </View>


                <View /*style={styles.separator}*//>

                <TextInput /*style={styles.input}*/
                           placeholder="Nazwa użytkownika"
                           value={username}
                           onChangeText={setUsername}
                           autoCapitalize="none"
                           placeholderTextColor={colors.appThirdColor}
                />

                <View /*style={[styles.input, tw`flex flex-row items-center justify-between`]}*/>
                    <TextInput
                        /*style={styles.inputText}*/
                        placeholder="Hasło"
                        value={password}
                        autoCapitalize="none"
                        secureTextEntry={showPassword}
                        placeholderTextColor={colors.appThirdColor}
                        onChangeText = {(text) => setPassword(text)}
                    />

                    
                </View>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={localStyles.forgotPassword}>Zapomniałeś hasła?</Text>
                </TouchableOpacity>

                <View /*style={styles.separator}*//>

                <TouchableOpacity onPress={handleLogin} /*style={styles.button}*/>
                    <Text /*style={styles.buttonText}*/>Zaloguj się</Text>
                </TouchableOpacity>
            </View>
            <View /*style={styles.gapContainer}*/>
                <TouchableOpacity onPress={handleRegister}>
                    <Text /*style={styles.lr_bottomText}*/>
                        Nie masz konta w serwisie
                        <Text /*style={styles.highlightText}*/> MovieGO</Text>
                        ?
                        <Text /*style={styles.boldText}*/> Załóż konto</Text>
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const localStyles = StyleSheet.create({

    forgotPassword: {
        textAlign: 'right',
        fontSize: dimensions.smallTextSize,
        color: colors.appThirdColor,
    },

});

export default Login;

/*<TouchableOpacity onPress={togglePassword}>
                        {showPassword ? (
                            <Icon name="eye" style={styles.icon}/>
                        ) : (
                            <Icon name="eye-slash" style={styles.icon}/>
                        )}
                    </TouchableOpacity>*/