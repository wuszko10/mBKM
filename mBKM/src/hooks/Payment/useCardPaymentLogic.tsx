import { useState } from "react";
import checkInternetConnection from "../../utils/network.tsx";
import { payCard,topUpCard } from "../../services/payment.service.tsx";
import { storage } from "../../../App.tsx";
import { CardPaymentProps } from "../../components/Payments/CardPayment.tsx";
import { WalletDAO } from "../../types/interfaces.tsx";

export const useCardPaymentLogic = (props: CardPaymentProps, wallet: WalletDAO | null, setWallet: (wallet: (WalletDAO | null)) => void, token: string | null) => {

    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [popupText, setPopupText] = useState("");

    const processCardPayment = async (cardNumber: string, expiryDate: string, cvv: string) => {

        checkInternetConnection().then();

        props.setStopPayment(false);
        setIsProcessing(true);
        let data;
        try {
            if (props.userTicketId) {
                data = await payCard(props.transactionAmount, props.transactionId, cardNumber, expiryDate, cvv, props.userTicketId, token ? token : '');
            } else {
                data = await topUpCard(props.transactionAmount, props.transactionId, cardNumber, expiryDate, cvv, wallet ? wallet?.id : '', token ? token : '');
                if (data) {
                    setWallet(data);
                    storage.set('wallet', JSON.stringify(data));
                }
            }

            if (data) {
                setPopupText("Transakcja zakończona pomyślnie!");
            }
        } catch (error) {
            if (error.response.status === 406) {
                setPopupText("Podano błędne dane karty.");
            } else if (error.response.status === 404) {
                setPopupText("Błąd karty.");
            } else {
                setPopupText("Wystąpił błąd podczas przetwarzania płatności.");
            }
        } finally {
            setIsProcessing(false);
            setShowPopup(true);
        }
    };

    const handleCardPayment = () => {
        if (props.transactionAmount && cardNumber && expiryDate && cvv) {
            processCardPayment(cardNumber,expiryDate,cvv).then();
        } else {
            console.log('Proszę wprowadzić poprawne dane karty.');
        }
    };

    return {
        cardNumber,
        setCardNumber,
        expiryDate,
        setExpiryDate,
        cvv,
        setCvv,
        handleCardPayment,
        showPopup,
        isProcessing,
        popupText
    };
}
