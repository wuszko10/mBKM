import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useAuth} from "../../context/authProvider";
import {fetchDashboard} from "../../services/metadata.service";
import {isExpired} from "react-jwt";

export const useHome = () => {

    const { token } = useAuth();

    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(30);
    const [transactions, setTransactions] = useState([]);
    const [userTickets, setUserTickets] = useState([]);
    const [usersTotalAmount, setUsersTotalAmount] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);


    const refreshData = useCallback( (token) => {
        fetchDashboard(days, token)
            .then((data) => {
                setTransactions(data.transactions);
                setUserTickets(data.userTickets);
                setUsersTotalAmount(data.usersTotalAmount);
                setActiveUsers(data.activeUsers);
                setTotalAmount(data.transactions.reduce((sum, transaction) => sum + transaction.finalPrice, 0));
            })
            .catch(() => {
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            }).finally(() => {
            setLoading(false);
        });
    }, [days])


    useEffect(() => {
        if (token && !isExpired(token)) {
            refreshData(token);
        }
    }, [refreshData, token])

    return {
        loading,
        days,
        transactions,
        userTickets,
        usersTotalAmount,
        activeUsers,
        totalAmount,
        setDays,
    }

}
