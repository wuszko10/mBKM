import {useAuth} from "../../context/authProvider";
import {useCallback, useEffect, useState} from "react";
import {getUser} from "../../services/Users/user.service";
import {toast} from "react-toastify";
import {changeActiveStatus} from "../../services/Users/changeActiveStatus";

export const useUserDetails = (id) => {

    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [wallet, setWallet] = useState();
    const [userTickets, setUserTickets] = useState();
    const [transactions, setTransactions] = useState();
    const [address, setAddress] = useState();
    const [topUps, setTopUps] = useState();
    const [sessions, setSessions] = useState();

    const refreshUser = useCallback( () => {
        getUser(id, token)
            .then((data) => {
                setUser(data.user);
                setWallet(data.wallet);
                setUserTickets(data.userTickets);
                setTransactions(data.transactions);
                setAddress(data.address);
                setTopUps(data.topUps);
                setSessions(data.sessions);
            })
            .catch(() => {
                toast.warn('Błąd odświeżania danych', {
                    position: 'top-right',
                    theme: "colored",
                });
            }).finally(() => {
            setLoading(false);
        });
    }, [id, token])


    useEffect(() => {
        refreshUser();
    }, [refreshUser])

    const changeStatus = async () => {

        await changeActiveStatus(user.id, token, refreshUser);
    }


    return {
        loading,
        userDetails: user,
        wallet,
        userTickets,
        transactions,
        address,
        topUps,
        sessions,
        changeStatus
    }
}
