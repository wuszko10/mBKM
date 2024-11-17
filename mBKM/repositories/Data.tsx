import { Ticket,TicketsPurchased } from "./interfaces.tsx";

export const ticketsData: Ticket[] = [
    {
        _id: "t00001",
        type: "jednorazowy",
        lines: "1",
        price: 5.00
    },
    {
        _id: "t00002",
        type: "okresowy",
        lines: "1",
        period: 3,
        price: 50.00
    },
    {
        _id: "t00003",
        type: "jednorazowy",
        lines: "wszystkie",
        period: 60,
        price: 5.00
    },
    {
        _id: "t00004",
        type: "okresowy",
        lines: "wszystkie",
        period: 6,
        price: 280.00
    }
];

export const discounts = [
    {
        _id: "discount_id_1",
        name: "Normalny",
        type: "jednorazowy",
        discountPercentage: 100
    },
    {
        _id: "discount_id_2",
        name: "Ulgowy",
        type: "jednorazowy",
        discountPercentage: 50
    },
    {
        _id: "discount_id_3",
        name: "Normalny",
        type: "okresowy",
        discountPercentage: 100
    },
    {
        _id: "discount_id_4",
        name: "Ulgowy studencki",
        type: "okresowy",
        discountPercentage: 49
    },
    {
        _id: "discount_id_5",
        name: "Ulgowy uczniowski",
        type: "okresowy",
        discountPercentage: 51
    }
];

export const transactions = [
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

export const tickets: TicketsPurchased[] = [
    {
        _id: 3512345,
        userId: 4444,
        number: "b00001x",
        ticketTypeId: "t00001",
        status: "zakupiony",
        discountId: "discount_id_1",
        purchaseDate: "2024-11-03T14:20:00Z",
        startDate: null,
        endDate: null,
        finalPrice: 5.00,
    },
    {
        _id: 478,
        userId: 76,
        number: "b05476x",
        ticketTypeId: "t00001",
        status: "zakupiony",
        discountId: "discount_id_1",
        purchaseDate: "2024-11-03T14:20:00Z",
        startDate: null,
        endDate: null,
        finalPrice: 5.00,
    }
];
