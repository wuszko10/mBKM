import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";
import { storage } from "../../App.tsx";

export const addTransaction = async (ticketId: string, finalPrice: number, methodId: string, userId: string, statusId: string) => {

    const userTicketData = {
        number: '',
        transactionId: '',
        userId: '',
        ticketId: ticketId,
        statusId: statusId,
    };

    const transactionData = {
        number: '',
        userId: '',
        finalPrice: finalPrice,
        paymentDate: new Date().toISOString(),
        referenceId: '',
        methodId: methodId,
    };

    try {
        const token = storage.getString('token');
        const response = await axios.post(SERVER_URL + 'transaction/create', {
            transactionData: transactionData,
            userTicketData: userTicketData,
            userId: userId,
        }, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        // toast.success('Dodano nowy przystanek', {
        //     position: 'top-right',
        //     theme: "colored",
        // });


        return response.data;
    } catch (err) {
        // toast.error('Przystanek nie został utworzony', {
        //     position: 'top-right',
        //     theme: "colored",
        // });
        console.log ('Błąd przy transackji: ' + err);
    }
};
export const fetchTransactions = async () => {
    // const token =  await AsyncStorage.getItem('token');
    const token =  storage.getString('token');

    const response = await axios.get(SERVER_URL + `tickets`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const rollbackTransaction = async (transactionId: string, ticketId: string) => {

    const params = new URLSearchParams({
        transactionId,
        ticketId
    });

    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(SERVER_URL + `rollback/${params}`, {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        // toast.success('Przystanek został usunięty', {
        //     position: 'top-right',
        //     theme: "colored",
        // });
        return response.data;
    } catch (err) {
        // toast.error('Przystanek nie został usunięty', {
        //     position: 'top-right',
        //     theme: "colored",
        // });
    }
}
