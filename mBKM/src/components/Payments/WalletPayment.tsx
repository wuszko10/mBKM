import React,{ useState } from "react";
import { View,Text,TouchableOpacity,ActivityIndicator } from "react-native";
import Popup from "../Global/Popup.tsx";
import { CommonActions,useNavigation } from "@react-navigation/native";
import stylesApp from "../../style/stylesApp.js";
import { colors } from "../../style/styleValues.js";
import ProcessingPopup from "../Global/ProcessingPopup.tsx";
import { checkLocation } from "../Global/CheckLocation.tsx";
import { NavigationProp } from "../../types/navigation.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { payWallet } from "../../services/payment.service.tsx";
import { storage } from "../../../App.tsx";
import { useLocalStops } from "../../hooks/Ticket/useLocalStops.tsx";

interface WalletPaymentProps {
    transactionId: string;
    transactionAmount: number;
    userTicketId: string;
    setStopPayment: React.Dispatch<React.SetStateAction<boolean>>;
    closePopup: () => void;
}


const WalletPayment: React.FC<WalletPaymentProps> = (props) => {

    const navigation = useNavigation<NavigationProp>();

    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentPopupText, setPaymentPopupText] = useState("");
    const [walletStatus, setWalletStatus] = useState(false);
    const { wallet, setWallet, token } = useAuth();
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
        navigation.dispatch( (state) => {
            const userPanelIndex = state.routes.findIndex(route => route.name === "UserPanel");

            return CommonActions.reset({
                index: userPanelIndex !== -1 ? userPanelIndex : 0,
                routes: [
                    { name: 'UserPanel', state: { routes: [{ name: 'Wallet' }] } },
                ],
            });
        });
    }

    const processWalletPayment = async () => {

        let inRange;
        let data;

        props.setStopPayment(false);
        setIsProcessing(true);
        setShowPaymentPopup(true);

        try {
            data = await payWallet(props.transactionAmount, props.transactionId, wallet ? wallet?.id : '', props.userTicketId, token ? token : '');
            if (data) {

                setWallet(data);
                storage.set('wallet', JSON.stringify(data));

                let retries = 0;
                while (!stops && retries < 10) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    retries++;
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
            props.setStopPayment(false);
            setWalletStatus(false);
            setPopupText("Brak wystarczających środków. Czy chcesz doładować portfel?");
            setShowPopup(true);
        }
    };

    if (isLoading) {
        return (
            <View style={stylesApp.container}>
                <ActivityIndicator size="large" color={colors.appFirstColor} />
            </View>
        )
    }

    return (
        <View style={stylesApp.paymentBox}>
            <Text style={stylesApp.whiteNormalCenterText}>Stan konta: <Text style={stylesApp.boldText}>{wallet?.amount.toFixed(2)} złotych</Text></Text>
            <View style={stylesApp.separator}/>
            <TouchableOpacity onPress={handleWalletPayment} style={stylesApp.whiteButton}>
                <Text style={[stylesApp.popupText,{ color: colors.appFirstColor }]}>Zapłać z portfela</Text>
            </TouchableOpacity>

            {showPopup && (
                <Popup
                    showPopup={showPopup}
                    message={popupText}
                    confirmationText={"Tak"}
                    cancelText={"Nie"}
                    confirmationAction={ walletStatus ? confirmValidateTicketPopup : confirmWalletPopup}
                    cancelAction={props.closePopup}
                />
            )}

            { showPaymentPopup && (
                <ProcessingPopup
                    showPopup={showPaymentPopup}
                    isProcessing={isProcessing}
                    cancelText={paymentPopupText}
                    cancelAction={props.closePopup}/>
            )}
        </View>
    );
};

export default WalletPayment;
