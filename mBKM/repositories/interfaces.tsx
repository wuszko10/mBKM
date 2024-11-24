export interface TopUpTransaction {
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

export interface TicketOrderTransaction {
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

export interface Relief {
    _id: string;
    name: string;
    type: string;
    discountPercentage: number;
}

export interface PaymentMethod {
    id: number;
    icon: string;
    label: string;
}

export interface Line {
    _id: number;
    line: string;
}

export interface BusStop {
    _id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}

