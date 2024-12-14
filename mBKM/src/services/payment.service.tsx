import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";
import { storage } from "../../App.tsx";


export const payWallet = async (amount: number, transactionId: string) => {

    const token = storage.getString('token');
    const response = await axios.post(SERVER_URL + 'pay/card', {
        amount: amount,
        transactionId: transactionId,
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
};

export const payCard = async (amount: number, transactionId: string, cardNumber: string, expiryDate: string, cvv: string, userTicketId: string) => {

    const token = storage.getString('token');
    const response = await axios.post(SERVER_URL + 'pay/card', {
        amount: amount,
        transactionId: transactionId,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        userTicketId: userTicketId,
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
};


export const payBlik = async (amount: number, transactionId: string, code: string, userTicketId: string) => {

    const token = storage.getString('token');
    console.log("Transaction " + transactionId);
    const response = await axios.post(SERVER_URL + 'pay/blik', {
        amount: amount,
        transactionId: transactionId,
        code: code,
        userTicketId: userTicketId,
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
};

export async function topUpCard  (amount: number, transactionId: string, cardNumber: string, expiryDate: string, cvv: string) {

    const token = storage.getString('token');
    const response = await axios.post(SERVER_URL + 'top-up/card', {
        amount: amount,
        transactionId: transactionId,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv
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
};


export async function topUpBlik (amount: number, transactionId: string, code: string) {

    const token = storage.getString('token');
    console.log("Transaction " + transactionId);
    const response = await axios.post(SERVER_URL + 'top-up/blik', {
        amount: amount,
        transactionId: transactionId,
        code: code
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
