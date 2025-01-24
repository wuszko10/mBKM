import { BusStop } from "../../types/interfaces.tsx";
import { useEffect,useState } from "react";
import { storage } from "../../../App.tsx";

export const useLocalStops = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [stops, setStops] = useState<BusStop[]>();

    const getStops = () => {

        if(!isLoading) return;

        const stopsStr = storage.getString('stops')

        if (stopsStr) {
            const parseStops: BusStop[] = JSON.parse(stopsStr);

            const filteredStops = parseStops.filter(s => s.isActive);

            setStops(filteredStops);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getStops();
    }, [isLoading]);

    return {
        stops,
        isLoading,
    };
}
