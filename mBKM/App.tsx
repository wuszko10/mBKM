import React,{ useEffect } from "react";
import styles from "./src/style/stylesApp";
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
import BuyTicketSummary from "./src/screens/BuyTicket/BuyTicketSummary/BuyTicketSummary.tsx";
import TicketDetails from "./src/screens/Tickets/TicketDetails.tsx";
import TopUpScreen from "./src/screens/Wallet/TopUpScreen.tsx";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "./src/style/styleValues.js";
import stylesApp from "./src/style/stylesApp";
import BuyTicketSelection from "./src/screens/BuyTicket/BuyTicketSelection.tsx";
import BuyTicketConfiguration from "./src/screens/BuyTicket/BuyTicketConfiguration.tsx";
import PaymentScreen from "./src/screens/Global/PaymentScreen.tsx";
import ValidateTicket from "./src/screens/Tickets/ValidateTicket.tsx";
import {useAppData} from "./src/hooks/GlobalData/useAppData.tsx";
import {isExpired} from "react-jwt";
import { MMKV } from "react-native-mmkv";

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
            tabBarStyle: stylesApp.tabBarStyle,
            tabBarItemStyle: stylesApp.tabBarItemStyle,
        })}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false,tabBarLabel: "Start", tabBarIcon: renderHomeBarIcon }} />
            <Tab.Screen name="Wallet" component={Wallet}
                        options={{ headerShown: false,tabBarLabel: "Wallet", tabBarIcon: renderWalletBarIcon }} />
            <Tab.Screen name="Tickets" component={Tickets}
                        options={{ headerShown: false,tabBarLabel: "Tickets", tabBarIcon:renderTicketBarIcon }} />
            <Tab.Screen name="Profile" component={Profile}
                        options={{ headerShown: false,tabBarLabel: "Profile", tabBarIcon: renderUserBarIcon }} />
        </Tab.Navigator>
    );
}

function MainApp() {
    const { token } = useAuth();

    const { refreshAll } = useAppData();

    useEffect(() => {
        if (token && !isExpired(token)) {
            refreshAll(token);
            console.log(token);
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

    return (
        <SafeAreaView style={styles.appContainer}>
            <AuthProvider>
                <MainApp />
            </AuthProvider>
        </SafeAreaView>
    );
}

export default App;
