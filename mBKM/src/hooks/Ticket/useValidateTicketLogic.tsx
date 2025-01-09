import { useEffect,useState } from "react";
import { CommonActions,useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { useLocalStops } from "./useLocalStops.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { BusStop } from "../../types/interfaces.tsx";
import { checkLocation } from "../../utils/CheckLocation.tsx";
import { validateTicket } from "../../services/ticket.service.tsx";
import checkInternetConnection from "../../utils/network.tsx";

export const useValidateTicketLogic = (userTicketId: string, walletTransaction: boolean | undefined) => {

    const [location, setLocation] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState(false);
    const [badPopupText, setBadPopupText] = useState('');
    const [showBadPopupRequest, setShowBadPopupRequest] = useState(false);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [cancelPopupText, setCancelPopupText] = useState('');
    const [refreshData, setRefreshData] = useState(false);

    const navigation = useNavigation<NavigationProp>();
    const { stops } = useLocalStops();
    const { token } = useAuth();


    useEffect(() => {
        if (walletTransaction) {
            setLocation(true);
            setRefreshData(true);
        }
    }, [])

    useEffect(() => {
        if (walletTransaction && location) {
            setLoading(false);
            confirmationPopupAction().then();
        }
    }, [walletTransaction, location])

    const confirmationPopupAction = async () => {


        setShowPaymentPopup(true);

        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            return;
        }

        if (!location) {
            setCancelPopupText("Błąd. Lokalizacja jest wymagana, aby skasować bilet.");
            setIsProcessing(false);
            return;
        }

        try {
            setIsProcessing(true);

            const data = await validateTicket(userTicketId, token ? token : '');

            if (data) {
                setRefreshData(true);
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
        if (refreshData) {
            navigation.dispatch( (state) => {
                const userPanelIndex = state.routes.findIndex(route => route.name === "UserPanel");

                return CommonActions.reset({
                    index: userPanelIndex !== -1 ? userPanelIndex : 0,
                    routes: [
                        { name: 'UserPanel', state: { routes: [{ name: 'Tickets' }] } },
                        { name: 'TicketDetails', params: { userTicketId: userTicketId } },
                    ],
                });
            });
        } else {
            navigation.goBack();
        }

    }


    const checkLocationAndSetState = async (stops: BusStop[]) => {

        try {
            const isIn: boolean = await checkLocation(stops);
            if (isIn) {
                setLocation(true);
                setShowPopup(true);
                setLoading(false);
            } else {
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
            checkLocationAndSetState(stops).then();
        }
    }, [stops])

    const refreshLocation = () => {
        if (stops) {
            setLoading(true);
            setShowBadPopupRequest(false);
            checkLocationAndSetState(stops).then();
        }
    }


    return {
        loading,
        location,
        showPaymentPopup,
        isProcessing,
        cancelPopupText,
        cancelPopupAction,
        showPopup,
        confirmationPopupAction,
        showBadPopupRequest,
        badPopupText,
        refreshLocation,
        setLocation,
        setRefreshData,
        setLoading,
    };

}
