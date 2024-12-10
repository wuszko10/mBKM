import React,{ useEffect,useState } from "react";
import { ActivityIndicator,SafeAreaView,Text,View } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import { BusStop,Ticket } from "../../interfaces/interfaces.tsx";
import { StackNavigationProp } from "@react-navigation/stack";
import GetLocation from 'react-native-get-location';
import { busStopLocations } from "../../repositories/Data.tsx";
import stylesApp from "../../style/stylesApp.js";
import { calculateDistance } from "../../repositories/geofence.tsx";
import Popup from "../../components/Global/Popup.tsx";
import ProcessingPopup from "../../components/Global/ProcessingPopup.tsx";
import { useCheckLocation } from "../../components/Global/CheckLocation.tsx";
import { LOCATION_TIMEOUT } from "../../repositories/variables.tsx";

type RootStackParamList = {
    TicketDetails: undefined;
    Home: undefined;
    UserPanel: {screen: 'Tickets'};
    ValidateTicket: undefined;
};

type RouteParams = {
    transactionId: number;
    isInRangeRP?: boolean;
}
interface Location {
    latitude: number;
    longitude: number;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'ValidateTicket'>;
const ValidateTicket = () => {

    const [location, setLocation] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupBadRequest, setShowPopupBadRequest] = useState(false);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const {transactionId, isInRangeRP} = route.params as RouteParams;
    const isInRange = isInRangeRP || useCheckLocation();

    // let remainingTime = LOCATION_TIMEOUT;
    const [remainingTime, setRemainingTime] = useState(10000);



    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1000) {
                    clearInterval(interval);
                    check();
                    return 0;
                }
                if (isInRange) {
                    console.log("Tutaj 0000");
                    clearInterval(interval);
                    setLocation(true);
                    setShowPopup(true);
                    setLoading(false);
                    return prevTime;
                }
                return prevTime - 500;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [isInRange]);


    const check = () => {
        if (isInRange) {
            setLocation(true);
            setShowPopup(true);
            setLoading(false);
        } else {
            setLoading(false);
            setLocation(false);
            setShowPopupBadRequest(true);
        }
    }


    const confirmationPopupAction = () => {
        if (location) {
            setIsConfirm(true);
            setShowPaymentPopup(true);
            setIsProcessing(true);
            setTimeout( () => {
                setIsProcessing(false);
            }, 3000)
            setShowPopup(false);
        } else {

        }
    }
    const cancelPopupAction = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={stylesApp.popupContainer}>
            {
                !loading ? (
                    (location && isConfirm)?(
                        <ProcessingPopup
                            showPopup={showPaymentPopup}
                            isProcessing={isProcessing}
                            cancelText={"Bilet skasowany"}
                            cancelAction={cancelPopupAction}
                        />
                    ) : (location && !isConfirm) ? (
                        <Popup
                            showPopup={showPopup}
                            message={"Czy chcesz skasować bilet?"}
                            confirmationText={"Tak"}
                            cancelText={"Nie"}
                            confirmationAction={confirmationPopupAction}
                            cancelAction={cancelPopupAction} />
                    ) : (
                        <Popup
                            showPopup={showPopupBadRequest}
                            message={"Nie możemy cię zlokalizować"}
                            confirmationText={"Ponów"}
                            cancelText={"Zakończ"}
                            confirmationAction={confirmationPopupAction}
                            cancelAction={cancelPopupAction} />
                    )
                ) : (
                    <ActivityIndicator size="large" color="white" />
                )
            }
        </SafeAreaView>
    );
};

export default ValidateTicket;
