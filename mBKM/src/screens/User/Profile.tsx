import React,{ useState } from "react";
import { SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import tw from "twrnc";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Global/Header.tsx";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { userData } from "../../repositories/Data.tsx";
import Mci from "react-native-vector-icons/MaterialCommunityIcons";
import EditDataPopup from "../../components/User/EditDataPopup.tsx";
import ChangePasswordPopup from "../../components/User/ChangePasswordPopup.tsx";
import changePasswordPopup from "../../components/User/ChangePasswordPopup.tsx";
import { storage } from "../../../App.tsx";
import { NavigationProp } from "../../types/navigation.tsx";

const Profile = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [pesel,setPesel] = useState("");

    const [streetName,setStreetName] = useState("");
    const [streetNumber,setStreetNumber] = useState("");
    const [apartmentNumber,setApartmentNumber] = useState("");
    const [postalCode,setPostalCode] = useState("");
    const [postal,setPostal] = useState("");
    const [town,setTown] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [moreInfo,setMoreInfo] = useState(false);
    const [changeData,setChangeData] = useState(false);
    const [changePassword,setChangePassword] = useState(false);


    const userLocalData = {
        firstName,
        lastName,
        pesel,
        streetName,
        streetNumber,
        apartmentNumber,
        postalCode,
        postal,
        town,
        phoneNumber,
        email,
        password
    };

    const navigation = useNavigation<NavigationProp>();
    const { token, setToken, user } = useAuth();

    function handleLogout() {
        // await AsyncStorage.removeItem("token");
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
                {/*<Text style={stylesApp.blackText}>{user?.phoneNumber}</Text>*/}
                <Text style={stylesApp.blackText}>{user?.email}</Text>

                {moreInfo && (
                    <View style={{ marginTop: 10 }}>
                        <Text style={stylesApp.blackText}>PESEL: {user?.pesel}</Text>
                        {/*<Text*/}
                        {/*    style={stylesApp.blackText}>Ulica: {userData?.streetName?userData?.streetName:userData.town} {userData.streetNumber} {userData?.apartmentNumber?("/" + userData?.apartmentNumber):""}</Text>*/}
                        {/*<Text style={stylesApp.blackText}>Poczta: {userData.postalCode}, {userData.town}</Text>*/}
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


            <EditDataPopup
                showPopup={changeData}
                setShowPopup={setChangeData}
                userData={userLocalData}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setStreetName={setStreetName}
                setStreetNumber={setStreetNumber}
                setApartmentNumber={setApartmentNumber}
                setPostalCode={setPostalCode}
                setPostal={setPostal}
                setTown={setTown}
                setPhoneNumber={setPhoneNumber}
                setEmail={setEmail}
            />

            <ChangePasswordPopup
                showPopup={changePassword}
                setShowPopup={setChangePassword}
                password={password}
                setPassword={setPassword}
            />

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
