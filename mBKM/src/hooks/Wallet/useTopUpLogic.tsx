import { useEffect,useState } from "react";
import { Line,MetadataType,PaymentMethod,Ticket } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { DEFAULT_TICKET_STATUS,SINGLE_TICKET,WALLET_PAYMENT } from "../../../variables.tsx";
import { useMMKVString } from "react-native-mmkv";

export const useTopUpLogic = () => {

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

    return {
        paymentMethodId,
        amount,
        filteredMethods : methods,
        isLoading,
        setPaymentMethodId,
        setAmount,
    }
}
