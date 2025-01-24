import React,{ useEffect } from "react";
import {
    SafeAreaView
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home/Home.tsx";
import Tickets from "./src/screens/Tickets/Tickets.tsx";
import Profile from "./src/screens/User/Profile.tsx";
import Wallet from "./src/screens/Wallet/Wallet.tsx";
import Login from "./src/screens/User/Login.tsx";
import Welcome from "./src/screens/Global/Welcome.tsx";
import Register from "./src/screens/User/Register.tsx";
import { AuthProvider,useAuth } from "./src/context/AuthContext.tsx";
import BuyTicketSummary from "./src/screens/BuyTicket/BuyTicketSummary.tsx";
import TicketDetails from "./src/screens/Tickets/TicketDetails.tsx";
import TopUpScreen from "./src/screens/Wallet/TopUpScreen.tsx";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "./src/style/styleValues.js";
import BuyTicketSelection from "./src/screens/BuyTicket/BuyTicketSelection.tsx";
import BuyTicketConfiguration from "./src/screens/BuyTicket/BuyTicketConfiguration.tsx";
import PaymentScreen from "./src/screens/Global/PaymentScreen.tsx";
import ValidateTicket from "./src/screens/Tickets/ValidateTicket.tsx";
import {useAppData} from "./src/hooks/GlobalData/useAppData.tsx";
import {isExpired} from "react-jwt";
import { MMKV } from "react-native-mmkv";
import SplashScreen from 'react-native-splash-screen';
import ResetPassword from "./src/screens/User/ResetPassword.tsx";
import style from "./style.tsx";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const storage = new MMKV();
function UserPanel() {

    const renderHomeBarIcon = ({ focused }: { focused: boolean }) => (
        <Entypo name="home" size={24} color={focused?colors.appFirstColor:colors.gray} />
    );

    const renderWalletBarIcon = ({ focused }: { focused: boolean }) => (
        <Entypo name="wallet" size={24} color={focused?colors.appFirstColor:colors.gray} />
    );
    const renderUserBarIcon = ({ focused }: { focused: boolean }) => (
        <Icon name="user" size={24} color={focused?colors.appFirstColor:colors.gray} />
    );
    const renderTicketBarIcon = ({ focused }: { focused: boolean }) => (
        <Mci name="ticket-confirmation" size={24} color={focused?colors.appFirstColor:colors.gray} />
    );

    return (
        <Tab.Navigator
            screenOptions={()=> ({
            tabBarStyle: style.tabBarStyle,
            tabBarItemStyle: style.tabBarItemStyle,
        })}
        initialRouteName={"Home"}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false,tabBarLabel: "Start", tabBarIcon: renderHomeBarIcon }} />
            <Tab.Screen name="Wallet" component={Wallet}
                        options={{ headerShown: false,tabBarLabel: "Portfel", tabBarIcon: renderWalletBarIcon }} />
            <Tab.Screen name="Tickets" component={Tickets}
                        options={{ headerShown: false,tabBarLabel: "Bilety", tabBarIcon:renderTicketBarIcon }} />
            <Tab.Screen name="Profile" component={Profile}
                        options={{ headerShown: false,tabBarLabel: "Konto", tabBarIcon: renderUserBarIcon }} />
        </Tab.Navigator>
    );
}

function MainApp() {
    const { token } = useAuth();

    const { refreshAll } = useAppData();

    useEffect(() => {
        if (token && !isExpired(token)) {
            refreshAll(token);
        }
    }, [token]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!token?(
                    <>
                        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
                    </>
                ):(
                    <>
                        <Stack.Screen name="UserPanel" component={UserPanel} options={{ headerShown: false }} />
                        <Stack.Screen name="TicketDetails" component={TicketDetails} options={{ headerShown: false }} />
                        <Stack.Screen name="TopUpScreen" component={TopUpScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="BuyTicketSelection" component={BuyTicketSelection} options={{ headerShown: false }} />
                        <Stack.Screen name="BuyTicketConfiguration" component={BuyTicketConfiguration} options={{ headerShown: false }} />
                        <Stack.Screen name="BuyTicketSummary" component={BuyTicketSummary} options={{ headerShown: false }} />
                        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ValidateTicket" component={ValidateTicket} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function App(): React.JSX.Element {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            SplashScreen.hide();
        }, 1800);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <SafeAreaView style={style.appContainer}>
            <AuthProvider>
                <MainApp />
            </AuthProvider>
        </SafeAreaView>
    );
}

export default App;
