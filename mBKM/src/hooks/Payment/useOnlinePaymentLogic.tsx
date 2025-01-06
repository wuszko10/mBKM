import { useState } from "react";
import { payBlik,topUpBlik } from "../../services/payment.service.tsx";
import { storage } from "../../../App.tsx";
import { OnlinePaymentProps } from "../../components/Payments/OnlinePayment.tsx";
import { WalletDAO } from "../../types/interfaces.tsx";
import checkInternetConnection from "../../utils/network.tsx";
import { ToastAndroid } from "react-native";

export const useOnlinePaymentLogic = (props: OnlinePaymentProps, wallet: WalletDAO | null, setWallet: (wallet: (WalletDAO | null)) => void, token: string | null) => {
    const [code, setCode] = useState<string>()
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [popupText, setPopupText] = useState("");
    const processTransactionPayment = async (code: string) => {

        checkInternetConnection().then();

        props.setStopPayment(false);
        setIsProcessing(true);

        let data;

        try {
            if (props.userTicketId) {
                data = await payBlik(props.transactionAmount, props.transactionId, code, props.userTicketId, token ? token : '');
                if (data) {
                    setPopupText("Transakcja zakończona pomyślnie!");
                }
            } else {
                data = await topUpBlik(props.transactionAmount, props.transactionId, code, wallet ? wallet?.id : '', token ? token : '');
                if (data) {
                    setWallet(data);
                    storage.set('wallet', JSON.stringify(data));
                    setPopupText("Transakcja zakończona pomyślnie!");
                }
            }
        } catch (error) {
            if (error.response.status === 406) {
                setPopupText("Błędny kod.\nBilet nie został zakupiony");
            } else {
                setPopupText("Wystąpił błąd podczas przetwarzania płatności.");
            }
        } finally {
            setIsProcessing(false);
            setShowPopup(true);
        }
    };


    const handleOnlinePayment = () => {
        if (props.transactionAmount && code && code.length === 6) {
            processTransactionPayment(code).then();
        } else {
            ToastAndroid.show('Proszę wprowadzić poprawne dane transakcji.', ToastAndroid.SHORT);
        }
    };

    return {
        code,
        setCode,
        showPopup,
        isProcessing,
        popupText,
        handleOnlinePayment
    };
}
