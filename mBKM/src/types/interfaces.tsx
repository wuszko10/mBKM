export interface TopUpTransaction {
    id: string;
    number: string;
    userId: string;
    amount: number;
    paymentDate: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    pesel: string;
    password: string;
}

export interface WalletDAO {
    id: string;
    userId: string;
    amount: number;
}

export interface Token {
    token: string;
}

export interface Ticket {
    _id: string;
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

export interface UserTicket {
    id: string;
    _id: string;
    number: string;
    transactionId: string;
    userId: string;
    ticketId: string;
    reliefId: string;
    price: number;
    purchaseDate: Date;
    ticketStartDate: Date;
    ticketEndDate: Date;
    QRCode: string;
    statusId: string;
}

export interface TicketOrderTransaction {
    _id: number;
    userId: number;
    number: string;
    discountId: string;
    paymentDate: string;
    methodId: string;
    finalPrice: number;
}

export interface Relief {
    _id: string;
    name: string;
    type: string;
    isActive: boolean;
    ticketType: string;
    percentage: number;
    typeName: string;
    typeLabel: string;
    ticketTypeName: string;
    ticketTypeLabel: string;
}

export interface Line {
    id: string;
    number: string;
    name: string;
    isActive: boolean;
}

export interface BusStop {
    _id: number;
    name: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface MetadataType {
    id: string;
    name: string;
    label: string;
}

export interface PaymentMethod {
    id: string,
    name: string,
    label: string,
    entypoIcon: string,
}

export interface DecodedToken {
    "userId": string,
    "name": string,
    "role": string,
    "isAdmin": boolean,
    "access": string,
    "iat": number,
    "exp": number

}

export interface Metadata {
    ticketTypes: MetadataType[];
    ticketPeriods: MetadataType[];
    ticketLines: MetadataType[];
    reliefTypes: MetadataType[];
    paymentMethods: PaymentMethod[];
    statusTypes: MetadataType[];
}

export interface FilterMapListType {
    label: string;
    value: string;
    key: string;
}

