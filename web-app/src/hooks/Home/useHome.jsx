import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useAuth} from "../../context/authProvider";
import {fetchDashboard} from "../../services/metadata.service";

export const useHome = () => {

    const { token } = useAuth();

    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(30);
    const [transactions, setTransactions] = useState();
    const [userTickets, setUserTickets] = useState();
    const [usersTotalAmount, setUsersTotalAmount] = useState();
    const [activeUsers, setActiveUsers] = useState();


    const refreshData = useCallback( () => {
        fetchDashboard(days, token)
            .then((data) => {
                setTransactions(data.transactions);
                setUserTickets(data.userTickets);
                setUsersTotalAmount(data.usersTotalAmount);
                setActiveUsers(data.activeUsers);
            })
            .catch(() => {
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            }).finally(() => {
            setLoading(false);
        });
    }, [days, token])


    useEffect(() => {
        refreshData();
    }, [refreshData])

    return {
        loading,
        days,
        transactions,
        userTickets,
        usersTotalAmount,
        activeUsers,
        setDays,
    }

}
