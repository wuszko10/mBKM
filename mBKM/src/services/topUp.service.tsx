import axios from "axios";
import { SERVER_URL } from "../../variables.tsx";
import { ToastAndroid } from "react-native";

export const addTopUp= async (amount: number, methodId: string, userId: string, token: string) => {

    try {
        const response = await axios.post(SERVER_URL + 'top-up/create', {
            number: '',
            userId: userId,
            amount: amount,
            paymentDate: new Date().toISOString(),
            referenceId: '',
            methodId: methodId,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (err) {
        ToastAndroid.show('Błąd przy doładowaniu', ToastAndroid.SHORT);
    }
};

export const fetchTopUp = async (userId: string, token: string) => {

    const response = await axios.get(SERVER_URL + `top-ups/all/${userId}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const rollbackTopUp = async (topUpId: string, token: string) => {

    const params = new URLSearchParams({
        topUpId: topUpId,
    });

    try {
        const response = await axios.delete(SERVER_URL + `top-up/rollback?${params.toString()}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (err) {
        ToastAndroid.show('Błąd przy cofaniu transackji', ToastAndroid.SHORT);
    }
}
