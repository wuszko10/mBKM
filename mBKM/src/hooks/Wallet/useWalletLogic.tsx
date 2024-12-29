import { useEffect,useState } from "react";
import { TopUpTransaction } from "../../types/interfaces.tsx";
import { fetchTopUp } from "../../services/topUp.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import checkInternetConnection from "../../utils/network.tsx";
import { ToastAndroid } from "react-native";

export const useWalletLogic = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { token, userId } = useAuth();

    const [topUps, setTopUps] = useState<TopUpTransaction[]>();

    const getData = (token: string) => {
        if(!isLoading) return;

        checkInternetConnection().then();

        fetchTopUp(userId, token)
            .then(async (data) => {
                setTopUps(data);
            })
            .catch(() => {
                ToastAndroid.show('Błąd pobierania danych', ToastAndroid.SHORT);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(()=>{
        if(token)
            getData(token);
    }, [isLoading])

    return {
        topUps,
        isLoading,
    }
}
