import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";

export const addTransaction = async (ticketId: string, finalPrice: number, methodId: string, userId: string, statusId: string, token: string) => {

    const userTicketData = {
        number: '',
        transactionId: '',
        userId: userId,
        ticketId: ticketId,
        statusId: statusId,
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
export const fetchTransactions = async (token: string) => {

    const response = await axios.get(SERVER_URL + `tickets`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const rollbackTransaction = async (transactionId: string, ticketId: string, token: string) => {

    const params = new URLSearchParams({
        transactionId,
        ticketId
    });

    try {
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
