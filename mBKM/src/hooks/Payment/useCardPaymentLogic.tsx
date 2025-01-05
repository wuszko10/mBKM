import { useState } from "react";
import checkInternetConnection from "../../utils/network.tsx";
import { payCard,topUpCard } from "../../services/payment.service.tsx";
import { storage } from "../../../App.tsx";
import { CardPaymentProps } from "../../components/Payments/CardPayment.tsx";
import { WalletDAO } from "../../types/interfaces.tsx";
import { ToastAndroid } from "react-native";

export const useCardPaymentLogic = (props: CardPaymentProps, wallet: WalletDAO | null, setWallet: (wallet: (WalletDAO | null)) => void, token: string | null) => {

    const [cardNumber, setCardNumber] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [popupText, setPopupText] = useState("");

    const [cardNumberError, setCardNumberError] = useState(false);
    const [expiryDateError, setExpiryDateError] = useState(false);
    const [cvvError, setCvvError] = useState(false);

    const CARD_NUMBER_REGEX = /^(?:\d{4} ?){3}\d{4}$/;
    const EXPIRY_DATE_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const CVV_REGEX = /^\d{3,4}$/;

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

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\D+/g, '');
        return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    const formatExpiryDate = (text: string) => {
        const cleaned = text.replace(/\D+/g, '');
        return cleaned.replace(/(\d{2})(\d{1,2})?/, (match, p1, p2) => (p2 ? `${p1}/${p2}` : p1));

    };

    const handleCardNumberChange = (input: string) => {
        const formatted = formatCardNumber(input);

        if (CARD_NUMBER_REGEX.test(formatted)) {
            setCardNumber(formatted);
            setCardNumberError(false);
        } else {
            setCardNumber(formatted);
            setCardNumberError(true);
        }
    };

    const handleExpiryDateChange = (input: string) => {
        const formatted = formatExpiryDate(input);

        if (EXPIRY_DATE_REGEX.test(formatted)) {
            setExpiryDate(formatted);
            setExpiryDateError(false);
        } else {
            setExpiryDate(formatted);
            setExpiryDateError(true);
        }
    };


    const validCVV = (input: string) => {
        if (CVV_REGEX.test(input)) {
            setCvv(input);
            setCvvError(false);
        } else {
            setCvv(input);
            setCvvError(true);
        }
    }

    const removeSpaces = (text: string) => text.replace(/\s+/g, '');

    const handleCardPayment = () => {
        if (props.transactionAmount && (cardNumber && !cardNumberError) && (expiryDate && !expiryDateError) && (cvv && !cvvError)) {
            const cn = removeSpaces(cardNumber);
            processCardPayment(cn,expiryDate,cvv).then();
        } else {
            ToastAndroid.show('Proszę wprowadzić poprawne dane karty.', ToastAndroid.SHORT);
        }
    };

    return {
        cardNumber,
        expiryDate,
        cvv,
        cardNumberError,
        expiryDateError,
        cvvError,
        showPopup,
        isProcessing,
        popupText,
        handleExpiryDateChange,
        handleCardNumberChange,
        validCVV,
        handleCardPayment,
    };
}
