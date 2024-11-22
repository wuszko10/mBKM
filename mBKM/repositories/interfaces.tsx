export interface TransactionData {
    transactionId: string;
    userId: string;
    amount: number;
    date: string;
}

export interface Ticket {
    _id: number;
    type: string;
    lines: string;
    period?: number;
    price: number;
}

export interface TicketsPurchased {
    _id: number;
    userId: number;
    number: string;
    ticketTypeId: number;
    status: 'zakupiony' | 'skasowany' | 'ważny' | 'nieważny';
    lineId: number,
    discountId: string;
    purchaseDate: string;
    startDate: string | null;
    endDate: string | null;
    finalPrice: number;
}

export interface Discount {
    _id: string;
    name: string;
    type: string;
    discountPercentage: number;
}
