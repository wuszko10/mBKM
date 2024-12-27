import axios from 'axios';
import {SERVER_URL} from "../../variables.tsx";
import { storage } from "../../App.tsx";


export const payWallet = async (amount: number, transactionId: string, walletId: string, userTicketId: string, token: string) => {

    const response = await axios.post(SERVER_URL + 'pay/wallet', {
        amount: amount,
        transactionId: transactionId,
        walletId: walletId,
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

export const payCard = async (amount: number, transactionId: string, cardNumber: string, expiryDate: string, cvv: string, userTicketId: string, token: string) => {

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


export const payBlik = async (amount: number, transactionId: string, code: string, userTicketId: string, token: string) => {

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

export async function topUpCard  (amount: number, topUpId: string, cardNumber: string, expiryDate: string, cvv: string, walletId: string, token: string) {

    const response = await axios.post(SERVER_URL + 'top-up/card', {
        amount: amount,
        topUpId: topUpId,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        walletId: walletId
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


export async function topUpBlik (amount: number, transactionId: string, code: string, walletId: string, token: string) {

    const response = await axios.post(SERVER_URL + 'top-up/blik', {
        amount: amount,
        transactionId: transactionId,
        code: code,
        walletId: walletId
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

export const fetchTransactions = async (token: string) => {

    const response = await axios.get(SERVER_URL + `tickets`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};
