export interface TopUpTransaction {
    transactionId: string;
    userId: string;
    amount: number;
    date: string;
}

export interface User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    PESEL: string;
    streetName?: string;
    streetNumber: string;
    apartmentNumber?: string;
    postalCode: string;
    postal: string;
    town: string;
    phoneNumber:string;
}

export interface Ticket {
    _id: number;
    type: string;
    lines: string;
    period?: string;
    price: number;
    offerStartDate: string;
    offerEndDate?: string;
    typeName: string;
    typeLabel: string;
    periodName: string;
    periodLabel: string;
    lineName: string;
    lineLabel: string;
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
    ticketType: string;
    discountPercentage: number;
    typeName: string;
    typeLabel: string;
    ticketTypeName: string;
    ticketTypeLabel: string;
}

export interface PaymentMethod {
    id: number;
    icon: string;
    label: string;
}

export interface Line {
    _id: number;
    number: string;
    name: string;
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

export interface MetadataType {
    _id: number;
    name: string;
    label: string;
}

export interface Metadata {
    ticketTypes: MetadataType[];
    ticketPeriods: MetadataType[];
    ticketLines: MetadataType[];
    reliefTypes: MetadataType[];
}

export interface FilterMapListType {
    label: string;
    value: string;
}

