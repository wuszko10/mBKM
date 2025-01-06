import {useEffect, useState} from "react";
import {POSTAL_CODE_REGEX} from "../../utils/validForms.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import {ToastAndroid} from "react-native";
import checkInternetConnection from "../../utils/network.tsx";
import {updateAddress, userRegister} from "../../services/user.service.tsx";

export const useAddressUpdateLogic = (setShowPopup: (showPopup: boolean) => void) => {
    const { userId, address, setAddress} = useAuth();

    const [fullAddress, setFullAddress] = useState('');
    const [town, setTown] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [postal, setPostal] = useState('');

    const [postalCodeError,setPostalCodeError] = useState(false);

    const refreshData = () => {
        if (address) {
            setFullAddress(address.fullAddress);
            setTown(address.town);
            setPostalCode(address.postalCode);
            setPostal(address.postal);
        }
    }

    useEffect(() => {
        refreshData();
    }, [address]);
    const formatPostalCode = (text: string) => {
        const cleaned = text.replace(/\D+/g, '');
        return cleaned.replace(/(\d{2})(\d{3})/, '$1-$2').trim();
    };

    const validPostalCode = (input: string) => {
        const formatted = formatPostalCode(input);

        if (POSTAL_CODE_REGEX.test(formatted)) {
            setPostalCode(formatted);
            setPostalCodeError(false);
        } else {
            setPostalCode(formatted);
            setPostalCodeError(true);
        }
    }


    const cancelAction = () => setShowPopup(false);

    const confirmationAction = async () => {

        if (!fullAddress || !postalCode || !postal) {
            ToastAndroid.show('Uzupełnij wszystkie pola', ToastAndroid.SHORT);
            return;
        }

        checkInternetConnection().then();

        try {

            const response = await updateAddress( address ? address.id : '',userId,fullAddress,town,postalCode,postal);

            if (response) {
                setAddress(response);
                cancelAction();
            }

        } catch (error) {
            ToastAndroid.show('Błąd podczas aktualizacji. Spróbuj ponownie', ToastAndroid.SHORT);
            refreshData();
        }
    }

    return {
        fullAddress,
        town,
        postalCode,
        postal,
        postalCodeError,
        setFullAddress,
        setTown,
        setPostal,
        validPostalCode,
        confirmationAction,
        cancelAction,
    }

}
