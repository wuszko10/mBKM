import { Modal,Text,TextInput,TouchableOpacity,View } from "react-native";
import React from "react";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";

type Props = {
    showPopup: boolean;
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    userData: {
        firstName: string;
        lastName: string;
        pesel: string;
        streetName: string;
        streetNumber: string;
        apartmentNumber: string;
        postalCode: string;
        postal: string;
        town: string;
        phoneNumber: string;
        email: string;
        password: string;
    };
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    setStreetName: React.Dispatch<React.SetStateAction<string>>;
    setStreetNumber: React.Dispatch<React.SetStateAction<string>>;
    setApartmentNumber: React.Dispatch<React.SetStateAction<string>>;
    setPostalCode: React.Dispatch<React.SetStateAction<string>>;
    setPostal: React.Dispatch<React.SetStateAction<string>>;
    setTown: React.Dispatch<React.SetStateAction<string>>;
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}
const EditDataPopup: React.FC<Props> = (props) => {


    return (
        <Modal
            animationType="fade"
            visible={props.showPopup}
            onRequestClose={() => props.setShowPopup(!props.showPopup)}
        >
            <View style={[stylesApp.popupContainer, { gap: 5 }]}>
                <TextInput style={stylesApp.input}
                           placeholder="email"
                           value={props.userData.email}
                           onChangeText={props.setEmail}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Imię"
                           value={props.userData.firstName}
                           onChangeText={props.setFirstName}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Nazwisko"
                           value={props.userData.lastName}
                           onChangeText={props.setLastName}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />


                <Text style={stylesApp.h3}>Dane kontaktowe</Text>

                <TextInput style={stylesApp.input}
                           placeholder="Ulica"
                           value={props.userData.streetName}
                           onChangeText={props.setStreetName}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Numer domu"
                           value={props.userData.streetNumber}
                           onChangeText={props.setStreetNumber}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Numer mieszkania"
                           value={props.userData.apartmentNumber}
                           onChangeText={props.setApartmentNumber}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Kod pocztowy"
                           value={props.userData.postalCode}
                           onChangeText={props.setPostalCode}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Kod pocztowy"
                           value={props.userData.postal}
                           onChangeText={props.setPostal}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Miejscowość"
                           value={props.userData.town}
                           onChangeText={props.setTown}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />

                <TextInput style={stylesApp.input}
                           placeholder="Numer telefonu"
                           value={props.userData.phoneNumber}
                           onChangeText={props.setPhoneNumber}
                           autoCapitalize="none"
                           placeholderTextColor={colors.gray}
                />
                <TouchableOpacity onPress={() => props.setShowPopup(!props.showPopup)}>
                    <Text>Zapisz</Text>
                </TouchableOpacity>
            </View>
        </Modal>

    );

};

export default EditDataPopup;
