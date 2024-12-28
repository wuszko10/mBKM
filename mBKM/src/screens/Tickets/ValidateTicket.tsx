import React,{ useEffect,useState } from "react";
import { ActivityIndicator,SafeAreaView,Text,View } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import stylesApp from "../../style/stylesApp.js";
import Popup from "../../components/Global/Popup.tsx";
import ProcessingPopup from "../../components/Global/ProcessingPopup.tsx";
import { checkLocation } from "../../components/Global/CheckLocation.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { validateTicket } from "../../services/ticket.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { useLocalStops } from "../../hooks/Ticket/useLocalStops.tsx";
import { BusStop } from "../../types/interfaces.tsx";
import { colors } from "../../style/styleValues.js";

type RouteParams = {
    userTicketId: string;
    walletTransaction?: boolean;
}

const ValidateTicket = () => {

    const [location, setLocation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState(false);
    const [badPopupText, setBadPopupText] = useState('');
    const [showBadPopupRequest, setShowBadPopupRequest] = useState(false);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [cancelPopupText, setCancelPopupText] = useState('');

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const { userTicketId, walletTransaction} = route.params as RouteParams;
    const { stops } = useLocalStops();
    const { token } = useAuth();

    useEffect(() => {

        if (walletTransaction) {
            setIsProcessing(true);
            setLocation(true);
            setLoading(false);
            confirmationPopupAction();
        }
    }, [])

    const checkLocationAndSetState = async (stops: BusStop[]) => {

        console.log("lokalizowanie");
        try {
            const isIn: boolean = await checkLocation(stops);
            console.log("isIn " + isIn);
            if (isIn) {
                console.log("nie bład");
                setLocation(true);
                setShowPopup(true);
                setLoading(false);
            } else {
                console.log("bład");
                setLocation(false)
                setBadPopupText("Nie jesteś na przystanku. Bilet nie może zostać skasowany");
                setShowBadPopupRequest(true);
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            setLocation(false);
            setBadPopupText("Nie możemy cię zlokalizować. Sprawdź czy lokalizacja jest włączona ");
            setShowBadPopupRequest(true);
        }
    };

    useEffect( () => {
        if (stops && !walletTransaction) {
            console.log("są przystanki");
            checkLocationAndSetState(stops);
        }
    }, [stops])


    const confirmationPopupAction = async () => {

        if (!location) {
            setCancelPopupText("Błąd. Lokalizacja jest wymagana, aby skasować bilet.");
            setIsProcessing(false);
            return;
        }

        try {
            setShowPaymentPopup(true);
            setIsProcessing(true);

            console.log("userTicketId: " + userTicketId);
            const data = await validateTicket(userTicketId, token ? token : '');

            if (data) {
                setCancelPopupText("Bilet został skasowany.");
            } else {
                setCancelPopupText("Błąd. Bilet nie został skasowany.");
            }
        } catch (error) {
            setCancelPopupText("Błąd połączenia z serwerem. Spróbuj ponownie.");
        } finally {
            setIsProcessing(false);
        }
    }
    const cancelPopupAction = () => {
        navigation.goBack();
    }

    const refreshLocation = () => {
        if (stops) {
            setLoading(true);
            setShowBadPopupRequest(false);
            checkLocationAndSetState(stops);
        }
    }

    if (loading) {
        return (
            <View style={stylesApp.popupContainer}>
                <ActivityIndicator size="large" color={colors.appWhite} />
                <Text style={{color: colors.gray}}>Lokalizowanie...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={stylesApp.popupContainer}>
            <ProcessingPopup
                showPopup={showPaymentPopup}
                isProcessing={isProcessing}
                cancelText={cancelPopupText}
                cancelAction={cancelPopupAction}
            />

            <Popup
                showPopup={showPopup}
                message={"Czy chcesz skasować bilet?"}
                confirmationText={"Tak"}
                cancelText={"Nie"}
                confirmationAction={confirmationPopupAction}
                cancelAction={cancelPopupAction} />

            <Popup
                showPopup={showBadPopupRequest}
                message={badPopupText}
                confirmationText={"Ponów"}
                cancelText={"Zakończ"}
                confirmationAction={refreshLocation}
                cancelAction={cancelPopupAction} />
        </SafeAreaView>
    );
};

export default ValidateTicket;
