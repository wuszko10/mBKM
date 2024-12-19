import { storage } from "../../App.tsx";
import axios from "axios";
import { SERVER_URL } from "../../variables.tsx";

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
        console.log ('Błąd przy doładowaniu: ' + err);
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

export const getTopUp = async (id: string, token: string) => {

    const response = await axios.get(SERVER_URL + `top-up/${id}`, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const rollbackTopUp = async (topUpId: string, token: string) => {

    const params = new URLSearchParams({
        topUpId
    });

    try {
        const response = await axios.delete(SERVER_URL + `rollback/tp/${params}`, {
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
