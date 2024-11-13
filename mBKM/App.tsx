import React from 'react';
import type {PropsWithChildren} from 'react';
import styles from './style/stylesApp';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Tickets from './screens/Tickets';

/*type SectionProps = PropsWithChildren<{
  title: string;
}>;*/

/*type RootStackParamList = {
  Home: undefined;
  Wallet: undefined;
  Tickets: undefined;
  ValidateTicket: undefined;
  Cart: undefined;
  Login: undefined;
  Register: undefined;
};*/

//const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainApp() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarLabel: 'Start'}}/>
        <Tab.Screen name="Cart" component={Cart} options={{headerShown: false, tabBarLabel: 'Cart'}}/>
        <Tab.Screen name="Tickets" component={Tickets} options={{headerShown: false, tabBarLabel: 'Tickets'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <MainApp/>
    </SafeAreaView>
  );
}

export default App;
