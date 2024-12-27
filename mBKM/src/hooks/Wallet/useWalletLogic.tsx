import { useEffect,useState } from "react";
import { PaymentMethod,TopUpTransaction } from "../../types/interfaces.tsx";
import { storage } from "../../../App.tsx";
import { WALLET_PAYMENT } from "../../../variables.tsx";
import { fetchTopUp } from "../../services/topUp.service.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export const useWalletLogic = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { token, userId } = useAuth();

    const [topUps, setTopUps] = useState<TopUpTransaction[]>();

    const getData = (token: string) => {
        if(!isLoading) return;

        fetchTopUp(userId, token)
            .then(async (data) => {
                setTopUps(data);
            })
            .catch((error) => {
                console.error("Błąd pobierania danych | " + error);
                // toast.error('Brak danych w bazie', {
                //     position: 'top-right',
                //     theme: "colored",
                // });
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
