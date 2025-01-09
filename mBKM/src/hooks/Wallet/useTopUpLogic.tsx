import { useEffect,useState } from "react";
import { PaymentMethod } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { WALLET_PAYMENT } from "../../../variables.tsx";
import { addTopUp } from "../../services/topUp.service.tsx";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import checkInternetConnection from "../../utils/network.tsx";
import { ToastAndroid } from "react-native";

export const useTopUpLogic = (userId: string, token: string | null) => {

    const navigation = useNavigation<NavigationProp>();
    const [isLoading, setIsLoading] = useState(true);
    const [paymentMethodId, setPaymentMethodId] = useState<string>('');
    const [methods, setMethods] = useState<PaymentMethod[]>();
    const [amount, setAmount] = useState<string>('');

    const getData = () => {
        if(!isLoading) return;

        const methodStr = storage.getString('paymentMethods');

        if (methodStr)
        {
            const parseMethods: PaymentMethod[] = JSON.parse(methodStr);

            const filteredMethods = parseMethods
                .filter(method =>  method.name !== WALLET_PAYMENT);

            setMethods(filteredMethods);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getData();
    }, [isLoading])

    const handleTopUp = async () => {
        if (!amount || !paymentMethodId) {
            ToastAndroid.show('Proszę podać kwotę i wybrać metodę płatności', ToastAndroid.SHORT);
            return;
        }

        const isConnected = await checkInternetConnection();
        if (!isConnected) {
            return;
        }

        const data = await addTopUp(Number(amount), paymentMethodId, userId, token ? token : '');

        if (data) {
            navigation.navigate('PaymentScreen', {
                transactionId: data.id,
                transactionNumber: data.number,
                paymentMethodId: paymentMethodId,
                transactionAmount: Number(amount),
            });
        }

    };

    return {
        paymentMethodId,
        amount,
        filteredMethods : methods,
        isLoading,
        setPaymentMethodId,
        setAmount,
        handleTopUp
    }
}
