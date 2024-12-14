import { CommonActions,useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types/navigation.tsx";
import { useEffect,useState } from "react";
import { PaymentMethod } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { rollbackTransaction } from "../../services/transaction.service.tsx";

export const usePaymentLogic = (transactionId: string, paymentMethodId: string, userTicketId: string) => {

    const navigation = useNavigation<NavigationProp>();

    const [isLoading, setIsLoading] = useState(true);
    const [method, setMethod] = useState<PaymentMethod>();

    const getaData = () =>{

        if (!isLoading) return

        const methodStr = storage.getString('paymentMethods');

        if (methodStr) {
            const parseMethod : PaymentMethod[] = JSON.parse(methodStr);

            const filteredMethod = parseMethod.find(m => m.id === paymentMethodId)
            setMethod(filteredMethod);

            setIsLoading(false);
        }
    }


    useEffect( () => {
        getaData();
    }, [isLoading])


    const closePopup = async () => {
        await rollbackTransaction(transactionId, userTicketId);
        navigation.dispatch( (state) => {
            const userPanelIndex = state.routes.findIndex(route => route.name === "UserPanel");

            return CommonActions.reset({
                index: userPanelIndex !== -1 ? userPanelIndex : 0,
                routes: [
                    { name: 'UserPanel', state: { routes: [{ name: 'Tickets' }] } },
                ],
            });
        });
    }

    return {
        method,
        isLoading,
        closePopup,
    }

}
