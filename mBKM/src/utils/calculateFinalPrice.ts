export const calculateFinalPrice = (
    ticketPrice: number,
    discountPercentage: number
): number => {
    if (ticketPrice < 0 || discountPercentage < 0) {
        throw new Error("Price and discount percentage must be non-negative");
    }
    const discountFactor = discountPercentage / 100;
    return ticketPrice * discountFactor;
};
