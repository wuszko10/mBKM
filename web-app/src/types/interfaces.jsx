export interface Ticket {
    id: number;
    type: number,
    lines: number,
    period: number,
    price: number,
    offerStartDate: Date,
    offerEndDate?: Date,
}
