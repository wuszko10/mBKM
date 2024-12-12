import { BusStop,Location } from "../../types/interfaces.tsx";
import { busStopLocations } from "../../repositories/Data.tsx";
import GetLocation from "react-native-get-location";
import { calculateDistance } from "../../repositories/geofence.tsx";
import { useEffect,useState } from "react";
import { DISTANCE,LOCATION_TIMEOUT } from "../../repositories/variables.tsx";

const distanceThreshold = DISTANCE;
const checkIfInRange = (userLocation: Location, stops: BusStop[]) => {

    return stops.some((stop:BusStop) => {
        const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            stop.latitude,
            stop.longitude
        );
        return distance <= distanceThreshold;
    });
};
export function useCheckLocation() {
    const [isInRange, setIsInRange] = useState(false);
    const stops = busStopLocations;

    useEffect(() => {
        if (stops.length > 0) {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: LOCATION_TIMEOUT,
            })
                .then((loc) => {
                    const inRange = checkIfInRange(loc, stops);
                    setIsInRange(inRange);
                })
                .catch((err) => {
                    console.error('Error while getting location:', err);
                    console.log(err.message);
                });
        }
    }, [stops]);

    return isInRange;
}
