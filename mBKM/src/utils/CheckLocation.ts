import { BusStop,Location } from "../types/interfaces.tsx";
import GetLocation from "react-native-get-location";
import { calculateDistance } from "./distance.ts";
import { DISTANCE,LOCATION_TIMEOUT } from "../../variables.tsx";

export const checkIfInRange = (userLocation: Location, stops: BusStop[]) => {

    return stops.some((stop:BusStop) => {
        const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            stop.latitude,
            stop.longitude
        );
        return distance <= DISTANCE;
    });
};
export function checkLocation (stops: BusStop[]) {
    return GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: LOCATION_TIMEOUT,
        })
            .then((loc) => {
                return checkIfInRange(loc, stops);
            })
            .catch((err) => {
                throw new Error(err);
            });
}
