import React from "react";
import styles from "./style/stylesApp";
import {
    SafeAreaView
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Tickets from "./screens/Tickets";
import Profile from "./screens/Profile.tsx";
import Wallet from "./screens/Wallet.tsx";
import Login from "./screens/Login.tsx";
import Welcome from "./screens/Welcome.tsx";
import Register from "./screens/Register.tsx";
import { AuthProvider,useAuth } from "./components/AuthContext.tsx";
import SummaryPurchaseScreen from "./screens/SummaryPurchaseScreen.tsx";
import TicketDetails from "./screens/TicketDetails.tsx";
import TopUpScreen from "./screens/TopUpScreen.tsx";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "./style/styleValues.js";
import stylesApp from "./style/stylesApp";
import Purchase from "./screens/Purchase.tsx";
import SelectingPurchaseConfiguration from "./screens/SelectingPurchaseConfiguration.tsx";
import PaymentScreen from "./screens/PaymentScreen.tsx";


type RootStackParamList = {
    Home: undefined;
    Wallet: undefined;
    Tickets: undefined;
    ValidateTicket: undefined;
    Purchase: undefined;
    Login: undefined;
    Register: undefined;
    Welcome: undefined;
    UserPanel: undefined;
    SelectingPurchaseConfiguration: undefined;
    SummaryPurchaseScreen: undefined;
    TicketDetails: undefined;
    TopUpScreen: undefined;
    PaymentScreen: undefined;
};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

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
        <Tab.Navigator screenOptions={({route})=> ({
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
                        <Stack.Screen name="Purchase" component={Purchase} options={{ headerShown: false }} />
                        <Stack.Screen name="SelectingPurchaseConfiguration" component={SelectingPurchaseConfiguration} options={{ headerShown: false }} />
                        <Stack.Screen name="SummaryPurchaseScreen" component={SummaryPurchaseScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
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
