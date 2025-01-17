import {describe,expect,it,jest} from "@jest/globals";
import {calculateDistance} from "../src/utils/distance.ts";
import {checkIfInRange} from "../src/utils/CheckLocation.ts";
import {BusStop} from "../src/types/interfaces.tsx";


jest.mock('react-native-get-location');
jest.mock('../src/utils/distance.ts', () => ({
    calculateDistance: jest.fn<(lat1: number, lon1: number, lat2: number, lon2: number) => number>(),
}));

describe('Check current user location - unit test', () => {
    it('should return true if user location is within any stop range', async () => {
        const userLocation = { latitude: 50.0, longitude: 19.0 };
        const mockStops: BusStop[] = [
            { _id: 1, name: 'stop1', latitude: 50.0, longitude: 19.0, isActive: true },
            { _id: 2, name: 'stop2', latitude: 51.0, longitude: 20.0, isActive: true },
        ];

        (calculateDistance as jest.MockedFunction<typeof calculateDistance>).mockReturnValue(15);

        const result = checkIfInRange(userLocation, mockStops);

        expect(result).toBe(true);
    });

    it('should return false if user location is not within any stop range', async () => {
        const userLocation = { latitude: 50.0, longitude: 19.0 };
        const mockStops: BusStop[] = [
            { _id: 1, name: 'stop1', latitude: 51.0, longitude: 20.0, isActive: true },
            { _id: 2, name: 'stop2', latitude: 52.0, longitude: 21.0, isActive: true },
        ];

        (calculateDistance as jest.MockedFunction<typeof calculateDistance>).mockReturnValue(40); // Mock the distance to be beyond the threshold

        const result = checkIfInRange(userLocation, mockStops);

        expect(result).toBe(false);
    });
});
