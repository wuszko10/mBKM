import React,{ useEffect,useState } from "react";
import { ActivityIndicator,SafeAreaView } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import stylesApp from "../../style/stylesApp.js";
import Popup from "../../components/Global/Popup.tsx";
import ProcessingPopup from "../../components/Global/ProcessingPopup.tsx";
import { useCheckLocation } from "../../components/Global/CheckLocation.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { useStops } from "../../hooks/GlobalData/useStops.tsx";
import { validateTicket } from "../../services/ticket.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { useLocalStops } from "../../hooks/Ticket/useLocalStops.tsx";

type RouteParams = {
    userTicketId: string;
    walletTransaction?: boolean;
}

const ValidateTicket = () => {

    const [location, setLocation] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupBadRequest, setShowPopupBadRequest] = useState(false);
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
            setLoading(false);
            confirmationPopupAction();
        } else {
            check()
        }
    }, [])

    const check = async () => {

        setLoading(true);
        let isInRange;

        if (!walletTransaction) {

            let retries = 0;
            while (!stops && retries < 10) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retries++;
            }
            if (stops) {
                isInRange = useCheckLocation(stops);
            }
        } else {
            isInRange = true;
        }


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


    const confirmationPopupAction = async () => {

        check()
            .then(async () => {
                if (location) {
                    setShowPaymentPopup(true);
                    setIsProcessing(true);

                    const data = await validateTicket(userTicketId,token ? token : '');

                    if (data) {
                        setIsConfirm(true);
                        setCancelPopupText("Bilet został skasowany.");
                        setIsProcessing(false);
                    }
                } else {
                    setIsConfirm(true);
                    setCancelPopupText("Błąd. Bilet nie został skasowany.");
                    setIsProcessing(false);
                }
            });
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
                            cancelText={cancelPopupText}
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
