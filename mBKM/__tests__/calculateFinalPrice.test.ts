import {describe,expect,it} from "@jest/globals";
import {calculateFinalPrice} from "../src/utils/calculateFinalPrice.ts";


describe('Calculate final ticket price  - unit test', () => {
    it('should calculate the final price correctly for a valid discount', () => {
        const ticketPrice = 100;
        const discountPercentage = 20;

        const result = calculateFinalPrice(ticketPrice, discountPercentage);

        expect(result).toBe(20); // 100 * 0.2 = 20
    });

    it('should return 0 if the discount percentage is 0', () => {
        const ticketPrice = 100;
        const discountPercentage = 0;

        const result = calculateFinalPrice(ticketPrice, discountPercentage);

        expect(result).toBe(0);
    });

    it('should throw an error if ticket price is negative', () => {
        const ticketPrice = -100;
        const discountPercentage = 20;

        expect(() => calculateFinalPrice(ticketPrice, discountPercentage)).toThrow(
            "Price and discount percentage must be non-negative"
        );
    });

    it('should throw an error if discount percentage is negative', () => {
        const ticketPrice = 100;
        const discountPercentage = -20;

        expect(() => calculateFinalPrice(ticketPrice, discountPercentage)).toThrow(
            "Price and discount percentage must be non-negative"
        );
    });

    it('should return the ticket price if discount percentage is 100', () => {
        const ticketPrice = 100;
        const discountPercentage = 100;

        const result = calculateFinalPrice(ticketPrice, discountPercentage);

        expect(result).toBe(100);
    });
});
