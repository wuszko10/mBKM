import { BusStop,Line,PaymentMethod,Relief,Ticket,TicketOrderTransaction,TopUpTransaction } from "./interfaces.tsx";

export const ticketsData: Ticket[] = [
    {
        _id: 40001,
        type: "jednorazowy",
        lines: "1",
        price: 5.00
    },
    {
        _id: 40002,
        type: "okresowy",
        lines: "1",
        period: 3,
        price: 50.00
    },
    {
        _id: 40003,
        type: "jednorazowy",
        lines: "wszystkie",
        period: 60,
        price: 5.00
    },
    {
        _id: 40004,
        type: "okresowy",
        lines: "wszystkie",
        period: 6,
        price: 280.00
    },
    {
        _id: 40007,
        type: "okresowy",
        lines: "wszystkie",
        period: 6,
        price: 210.00
    },
    {
        _id: 40008,
        type: "okresowy",
        lines: "wszystkie",
        period: 6,
        price: 230.00
    }
];

export const reliefs: Relief[] = [
    {
        _id: "discount_id_1",
        name: "normalny",
        type: "jednorazowy",
        discountPercentage: 100
    },
    {
        _id: "discount_id_2",
        name: "ulgowy",
        type: "jednorazowy",
        discountPercentage: 50
    },
    {
        _id: "discount_id_3",
        name: "normalny",
        type: "okresowy",
        discountPercentage: 100
    },
    {
        _id: "discount_id_4",
        name: "ulgowy studencki",
        type: "okresowy",
        discountPercentage: 49
    },
    {
        _id: "discount_id_5",
        name: "ulgowy uczniowski",
        type: "okresowy",
        discountPercentage: 51
    }
];

export const topUpTransactions: TopUpTransaction[] = [
    {
        transactionId: "TXN001",
        userId: "USR001",
        amount: 25.50,
        date: "2024-11-01T10:30:00Z"
    },
    {
        transactionId: "TXN002",
        userId: "USR002",
        amount: 15.75,
        date: "2024-11-02T12:45:00Z"
    },
    {
        transactionId: "TXN003",
        userId: "USR003",
        amount: 40.00,
        date: "2024-11-03T14:20:00Z"
    },
    {
        transactionId: "TXN004",
        userId: "USR001",
        amount: 30.00,
        date: "2024-11-04T09:10:00Z"
    },
    {
        transactionId: "TXN002",
        userId: "USR002",
        amount: 15.75,
        date: "2024-11-02T12:45:00Z"
    },
    {
        transactionId: "TXN003",
        userId: "USR003",
        amount: 40.00,
        date: "2024-11-03T14:20:00Z"
    },
];

export const ticketOrderTransactions: TicketOrderTransaction[] = [
    {
        _id: 3512345,
        userId: 4444,
        number: "b00001x",
        ticketTypeId: 40001,
        status: "zakupiony",
        discountId: "discount_id_1",
        lineId: 405201,
        purchaseDate: "2024-11-03T14:20:00Z",
        startDate: null,
        endDate: null,
        finalPrice: 5.00,
    },
    {
        _id: 478,
        userId: 76,
        number: "b05476x",
        ticketTypeId: 40001,
        status: "zakupiony",
        discountId: "discount_id_1",
        lineId: 405201,
        purchaseDate: "2024-11-03T14:20:00Z",
        startDate: null,
        endDate: null,
        finalPrice: 5.00,
    },
    {
        _id: 35354,
        userId: 4444,
        number: "b00gfd1x",
        ticketTypeId: 40001,
        status: "zakupiony",
        discountId: "discount_id_1",
        lineId: 405201,
        purchaseDate: "2024-11-03T14:20:00Z",
        startDate: null,
        endDate: null,
        finalPrice: 5.00,
    },
    {
        _id: 121,
        userId: 4444,
        number: "tt4432",
        ticketTypeId: 40001,
        status: "zakupiony",
        discountId: "discount_id_1",
        lineId: 405201,
        purchaseDate: "2024-11-03T14:20:00Z",
        startDate: null,
        endDate: null,
        finalPrice: 5.00,
    },
    {
        _id: 5522,
        userId: 4444,
        number: "wehha4321",
        ticketTypeId: 40001,
        status: "skasowany",
        discountId: "discount_id_1",
        lineId: 405201,
        purchaseDate: "2024-11-03T14:20:00Z",
        startDate: null,
        endDate: null,
        finalPrice: 5.00,
    }
];

export const lines: Line[] = [
    {
        _id: 405201,
        line: 'wszystkie',
    },
    {
        _id: 142412,
        line: 'A20',
    },
    {
        _id: 734576,
        line: 'A45',
    },
    {
        _id: 236463,
        line: 'A1',
    },
    {
        _id: 385684,
        line: 'A22',
    },
    {
        _id: 986785,
        line: 'A67',
    },
];

export const paymentMethods: PaymentMethod[] = [
    { id: 1, icon: 'wallet', label: 'Portfel' },
    { id: 2, icon: 'credit-card', label: 'Karta' },
    { id: 3, icon: 'credit', label: 'Online' },
];

export const busStopLocations: BusStop[] = [
    {
        _id: 1,
        name: "Przystanek A",
        latitude: 52.2296756,
        longitude: 21.0122287
    },
    {
        _id: 2,
        name: "Przystanek B",
        latitude: 52.2306756,
        longitude: 21.0132287
    },
    {
        _id: 3,
        name: "Przystanek C",
        latitude: 49.970354313543424,
        longitude: 20.908495856572674
    },
    {
        _id: 4,
        name: "Przystanek DDD",
        latitude: 49.970145569507004,
        longitude: 20.908485127736906
    }

];
