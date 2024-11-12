import 'react-native-gesture-handler';
import 'react-native-screens';
import React,{useEffect,useState} from 'react';
import {SafeAreaView,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import MovieDetails from './screens/MovieDetails';
import Profile from './screens/Profile';
import Tickets from './screens/Tickets';
import Hall from './screens/Hall';
import Login from './screens/Login';
import ForgotPass from './screens/ForgotPass';
import Register from './screens/Register';
import ForgotEmail from './screens/ForgotEmail';
import styles from './styles/styleDark.js';
import SplashScreen from 'react-native-splash-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors,dimensions} from './styles/styleValues.js';
import {AuthProvider, useAuth} from './components/AuthProvider.tsx';
import CinemaRepository from './repositories/CinemaRepository.tsx';
import {CinemaSchedule,HallAPI,Movie} from './repositories/Interfaces.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toNumber} from 'lodash';

type RootStackParamList = {
  Home: undefined;
  MovieDetails: undefined;
  Profile: undefined;
  Tickets: undefined;
  Hall: undefined;
  Login: undefined;
  ForgotEmail: undefined;
  ForgotPass: undefined;
  Register: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStack() {
  const { isLoggedIn } = useAuth();

    const [scheduleData, setScheduleData] = useState<CinemaSchedule[]>([]);
    const [moviesData, setMoviesData] = useState<Movie[]>([]);
    const [hallsData, setHallsData] = useState<HallAPI[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const schedules = await CinemaRepository.getSchedules();
                if (schedules) {
                    setScheduleData(schedules);
                }
                const movies = await CinemaRepository.getAllMovies();
                if (movies) {
                    setMoviesData(movies);
                }
                const halls = await CinemaRepository.getHalls();
                if (halls) {
                    setHallsData(halls);
                }
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };

        fetchData().then(()=>{});
    }, []);

  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
        >
            {(props) => <Home {...props} scheduleData={scheduleData} moviesData={moviesData} hallsData={hallsData} />}
        </Stack.Screen>
      <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={isLoggedIn ? Profile : Login} options={{ headerShown: false }} />
      <Stack.Screen name="Hall" component={isLoggedIn ? Hall : Login} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={isLoggedIn ? Login : Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotEmail" component={ForgotEmail} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
    const { isLoggedIn } = useAuth();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={isLoggedIn ? Profile : Login} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={isLoggedIn ? Login : Profile} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotEmail" component={ForgotEmail} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function TicketStack() {
    const { isLoggedIn } = useAuth();
    const [userID, setUserID] = useState(0);

    const getUserId = async () => {
        const stored = JSON.parse((await AsyncStorage.getItem('userData')) as string);
        if (stored) {
            const intId = toNumber(stored.id);
            setUserID(intId);
        } else {
            console.error('Nie pobrano danych');
        }
    };

    if (isLoggedIn) {
        getUserId().then(()=>{});
    }
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tickets"
                options={{ headerShown: false }}
            >
                {() => {
                    if (isLoggedIn) {
                        return <Tickets userID={userID} />;
                    } else {
                        return <Login />;
                    }
                }}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function MainApp() {

    const renderHomeBarIcon = ({ focused }: { focused: boolean }) => (
        <Entypo name="home" size={24} color={focused ? colors.appSecColor : colors.appThirdColor} />
    );
    const renderUserBarIcon = ({ focused }: { focused: boolean }) => (
        <Icon name="user" size={24} color={focused ? colors.appSecColor : colors.appThirdColor} />
    );
    const renderTicketBarIcon = ({ focused }: { focused: boolean }) => (
        <Mci name="ticket-confirmation" size={24} color={focused ? colors.appSecColor : colors.appThirdColor} />
    );

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.appSecColor,
                    tabBarInactiveTintColor: colors.appThirdColor,
                    tabBarStyle: {
                        backgroundColor: colors.appFirstColor,
                        minHeight: dimensions.bottomBarHeight,
                        paddingBottom: dimensions.paddingBar,
                        paddingTop: dimensions.paddingBar,
                        borderColor: colors.appFirstColor,
                    },
                }}
            >
                <Tab.Screen
                    name="MainHome"
                    component={HomeStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Start',
                        tabBarIcon: renderHomeBarIcon,
                    }}
                />
                <Tab.Screen
                    name="MainProfile"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Profil',
                        tabBarIcon: renderUserBarIcon,
                    }}
                />
                <Tab.Screen
                    name="MainTickets"
                    component={TicketStack}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Bilety',
                        tabBarIcon: renderTicketBarIcon,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
function App(): React.JSX.Element {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            SplashScreen.hide();
        }, 900);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <SafeAreaView style={styles.container2}>
            <StatusBar/>
                <AuthProvider>
                    <MainApp/>
                </AuthProvider>
        </SafeAreaView>
    );
}

export default App;
