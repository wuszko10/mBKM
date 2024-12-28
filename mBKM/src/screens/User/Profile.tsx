import React,{ useEffect,useState } from "react";
import { SafeAreaView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import Header from "../../components/Global/Header.tsx";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.tsx";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import { storage } from "../../../App.tsx";
import { NavigationProp } from "../../types/navigation.tsx";

const Profile = () => {

    const [moreInfo,setMoreInfo] = useState(false);
    const [changeData,setChangeData] = useState(false);
    const [changePassword,setChangePassword] = useState(false);


    const navigation = useNavigation<NavigationProp>();
    const { token, setToken, user } = useAuth();

    function handleLogout() {
        storage.delete('token');
        setToken(null);
        if (!token)
            navigation.navigate("Welcome");
    }

    return (
        <SafeAreaView style={[stylesApp.container,{ gap: 5 }]}>
            <Header title="Mój profil" />

            <Text style={[stylesApp.normalH3,{ fontSize: 18 }]}>Dane konta</Text>

            <View style={stylesApp.flatlistItem}>
                <Text style={stylesApp.blackText}>{user?.firstName} {user?.lastName}</Text>
                <Text style={stylesApp.blackText}>{user?.email}</Text>

                {moreInfo && (
                    <View style={{ marginTop: 10 }}>
                        <Text style={stylesApp.blackText}>PESEL: {user?.pesel ? (user.pesel.slice(0, -5) + '*****') : 'Brak nr PESEL'}</Text>
                        <Text style={stylesApp.blackText}>Numer telefonu: –––</Text>
                        <Text style={stylesApp.blackText}>Ulica: –––</Text>
                        <Text style={stylesApp.blackText}>Poczta: –––</Text>
                    </View>
                )}

                <TouchableOpacity onPress={() => setMoreInfo(!moreInfo)} style={{ alignItems: "center",marginTop: 10 }}>
                    <Text style={{ color: colors.darkGray }}>Więcej informacji</Text>
                </TouchableOpacity>
            </View>

            <View style={stylesApp.separator}/>

            <Text style={[stylesApp.normalH3,{ fontSize: 18 }]}>Ustawienia konta</Text>

            <View>
                <TouchableOpacity onPress={() => setChangeData(!changeData)} style={localStyle.changeButton}>
                    <Text style={stylesApp.blackText}>Zmień dane</Text>
                    <Mci name="chevron-right" size={24} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setChangePassword(!changePassword)} style={localStyle.changeButton}>
                    <Text style={stylesApp.blackText}>Zmień hasło</Text>
                    <Mci name="chevron-right" size={24} />
                </TouchableOpacity>
            </View>

            <View style={stylesApp.separator}/>

            <TouchableOpacity onPress={handleLogout} style={stylesApp.mainButton}>
                <Text style={stylesApp.whiteBoldCenterText}>Wyloguj się</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const localStyle = StyleSheet.create({
    changeButton: {
        ...stylesApp.flatlistItem,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});

export default Profile;
