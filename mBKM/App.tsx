import React from "react";
import styles from "./style/stylesApp";
import {
    SafeAreaView
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Purchase from "./screens/Purchase.tsx";
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
    SummaryPurchaseScreen: undefined;
    TicketDetails: undefined;
    TopUpScreen: undefined;
};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function UserPanel() {
  return(
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false,tabBarLabel: "Start" }} />
        <Tab.Screen name="Wallet" component={Wallet}
                    options={{ headerShown: false,tabBarLabel: "Wallet" }} />
        <Tab.Screen name="Cart" component={Purchase} options={{ headerShown: false,tabBarLabel: "Purchase" }} />
        <Tab.Screen name="Tickets" component={Tickets}
                    options={{ headerShown: false,tabBarLabel: "Tickets" }} />
        <Tab.Screen name="Profile" component={Profile}
                    options={{ headerShown: false,tabBarLabel: "Profile" }} />
      </Tab.Navigator>
  );
}

function MainApp() {
    const { token } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!token ? (
                    <>
                        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="UserPanel" component={UserPanel} options={{ headerShown: false }} />
                        <Stack.Screen name="SummaryPurchaseScreen" component={SummaryPurchaseScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="TicketDetails" component={TicketDetails} options={{ headerShown: false }} />
                        <Stack.Screen name="TopUpScreen" component={TopUpScreen} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function App(): React.JSX.Element {

    return (
        <SafeAreaView style={styles.container}>
            <AuthProvider>
                <MainApp />
            </AuthProvider>
        </SafeAreaView>
    );
}

export default App;
