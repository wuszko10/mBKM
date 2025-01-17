import { CommonActions,useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { useState } from "react";
import { useLocalStops } from "../Ticket/useLocalStops.tsx";
import checkInternetConnection from "../../utils/network.tsx";
import { payWallet } from "../../services/payment.service.tsx";
import { storage } from "../../../App.tsx";
import { checkLocation } from "../../utils/CheckLocation.ts";
import { WalletPaymentProps } from "../../components/Payments/WalletPayment.tsx";
import { WalletDAO } from "../../types/interfaces.tsx";

export const useWalletPaymentLogic = (props: WalletPaymentProps, wallet: WalletDAO | null, setWallet: (wallet: (WalletDAO | null)) => void, token: string | null) => {
    const navigation = useNavigation<NavigationProp>();

    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentPopupText, setPaymentPopupText] = useState("");
    const [walletStatus, setWalletStatus] = useState(false);
    const { stops, isLoading } = useLocalStops();

    const confirmValidateTicketPopup = () => {
        navigation.dispatch( (state) => {
            const userPanelIndex = state.routes.findIndex(route => route.name === "UserPanel");

            return CommonActions.reset({
                index: userPanelIndex !== -1 ? userPanelIndex : 0,
                routes: [
                    { name: 'UserPanel', state: { routes: [{ name: 'Tickets' }] } },
                    { name: 'ValidateTicket', params: { userTicketId: props.userTicketId, walletTransaction: true } },
                ],
            });
        });
    }

    const confirmWalletPopup = () => {
        navigation.goBack();
    }

    const processWalletPayment = async () => {

        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            return;
        }

        let inRange;
        let data;

        props.setStopPayment(false);
        setIsProcessing(true);
        setShowPaymentPopup(true);

        try {

            if (!props.transactionId || !token || !wallet?.id) {
                setPaymentPopupText("Brak wymaganych danych do przetworzenia płatności.");
                return;
            }

            data = await payWallet(
                props.transactionAmount,
                props.transactionId,
                wallet.id,
                props.userTicketId,
                token
            );

            if (data) {
                setWallet(data);
                storage.set('wallet', JSON.stringify(data));

                for (let retries = 0; retries < 10; retries++) {
                    if (stops) break;
                    await new Promise(resolve => setTimeout(resolve, 100));
                }

                if (stops) {
                    try {
                        inRange = await checkLocation(stops);

                        if (inRange) {
                            setShowPaymentPopup(false);
                            setPopupText("Czy chcesz skasować bilet?");
                            setShowPopup(true);
                        } else {
                            setPaymentPopupText("Transakcja zakończona pomyślnie!");
                        }
                    } catch (locationError) {
                        setPaymentPopupText("Transakcja zakończona pomyślnie!");
                    }
                }
            }
        } catch (error) {
            setPaymentPopupText("Wystąpił błąd podczas przetwarzania płatności.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleWalletPayment = () => {

        const balance = wallet?.amount;

        if (balance && (balance >= props.transactionAmount)) {
            processWalletPayment().then();
            setWalletStatus(true);
        } else {
            props.setWalletPayment(true);
            setWalletStatus(false);
            setPopupText("Brak wystarczających środków. Czy chcesz doładować portfel?");
            setShowPopup(true);
        }
    };

    return {
        isLoading,
        wallet,
        showPopup,
        popupText,
        walletStatus,
        confirmValidateTicketPopup,
        confirmWalletPopup,
        showPaymentPopup,
        isProcessing,
        paymentPopupText,
        handleWalletPayment
    };

}
