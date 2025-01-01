import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";
import { ToastAndroid } from "react-native";

export const addTransaction = async (ticketId: string, finalPrice: number, methodId: string, userId: string, statusId: string, startDate: string | undefined, reliefId: string, lineId: string, token: string) => {

    const userTicketData = {
        number: '',
        transactionId: '',
        reliefId: reliefId,
        lineId: lineId,
        price: finalPrice,
        purchaseDate: new Date().toISOString(),
        userId: userId,
        ticketId: ticketId,
        statusId: statusId,
        startDate: startDate,
    };

    const transactionData = {
        number: '',
        userId: userId,
        finalPrice: finalPrice,
        paymentDate: new Date().toISOString(),
        referenceId: '',
        methodId: methodId,
    };

    try {
        const response = await axios.post(SERVER_URL + 'transaction/create', {
            transactionData: transactionData,
            userTicketData: userTicketData,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });


        return response.data;
    } catch (err) {
        ToastAndroid.show('Błąd przy tworzeniu transackji', ToastAndroid.SHORT);
    }
};

export const rollbackTransaction = async (transactionId: string, ticketId: string, token: string) => {

    const params = new URLSearchParams({
        transactionId: transactionId,
        ticketId: ticketId,
    });

    try {
        const response = await axios.delete(SERVER_URL + `transaction/rollback?${params.toString()}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (err) {
        ToastAndroid.show('Błąd przy cofaniu transackji', ToastAndroid.SHORT);
    }
}
