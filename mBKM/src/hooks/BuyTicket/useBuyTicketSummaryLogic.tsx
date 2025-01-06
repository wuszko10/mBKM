import { useEffect,useState } from "react";
import { Line,MetadataType,PaymentMethod,Relief,Ticket } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { DEFAULT_TICKET_STATUS,SINGLE_TICKET,WALLET_PAYMENT } from "../../../variables.tsx";
import checkInternetConnection from "../../utils/network.tsx";
import { addTransaction } from "../../services/transaction.service.tsx";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";

export const useBuyTicketSummaryLogic = (selectedTicket: Ticket, selectedLines: Line | null, selectedRelief: Relief | null, selectedDate: string | undefined, finalPrice: number, userId: string, token: string | null,  ) => {

    const [isLoading, setIsLoading] = useState(true);
    const [paymentMethodId, setPaymentMethodId] = useState<string>('');
    const [methods, setMethods] = useState<PaymentMethod[]>();
    const [statusId, setStatusId] = useState<string>('');
    const navigation = useNavigation<NavigationProp>();

    const getData = () => {
        if(!isLoading) return;

        const methodStr = storage.getString('paymentMethods');
        const statusStr = storage.getString('statusTypes');

        if (methodStr && statusStr)
        {
            const parseMethods: PaymentMethod[] = JSON.parse(methodStr);
            const parseStatus: MetadataType[] = JSON.parse(statusStr);


            const filteredMethods = parseMethods
                .filter(method =>
                    selectedTicket.typeName === SINGLE_TICKET ? method.name === WALLET_PAYMENT :  method.name !== WALLET_PAYMENT);

            const filteredStatus = parseStatus.find(s => s.name === DEFAULT_TICKET_STATUS);

            if (filteredStatus) {
                const id = filteredStatus?.id;
                setStatusId(id);
            }

            setMethods(filteredMethods);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getData();
    }, [isLoading])

    const handleBuyTicket = async () => {
        if (paymentMethodId) {

            checkInternetConnection().then();

            const data = await addTransaction(selectedTicket._id, finalPrice, paymentMethodId, userId, statusId, selectedDate, selectedRelief ? selectedRelief._id : '', selectedLines ? selectedLines.id : '', token ? token : '');

            if (data) {
                navigation.navigate('PaymentScreen', {
                    transactionId: data.transactionId,
                    transactionNumber: data.transactionNumber,
                    paymentMethodId,
                    transactionAmount: data.transactionAmount,
                    userTicketId: data.userTicketId,

                })
            } else {
                ToastAndroid.show('Błąd tworzenia transakcji', ToastAndroid.SHORT);
            }

        } else {
            ToastAndroid.show('Wybierz metodę płatności', ToastAndroid.SHORT);
        }
    }

    return {
        line: selectedLines,
        paymentMethodId,
        filteredMethods : methods,
        isLoading,
        statusId,
        setPaymentMethodId,
        handleBuyTicket
    }
}
