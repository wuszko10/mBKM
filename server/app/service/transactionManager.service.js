export function getMetadataNames (transactions, tickets, users) {
    const transactionsArray = Array.isArray(transactions) ? transactions : [];

    return transactionsArray.map(transaction => {
        const transactionObj = transaction.toObject();
        return {
            ...transactionObj,
            userEmail: users.find(u => u.id === transaction.userId)?.email,
            numberTicket: tickets.find(t => t.id === transaction.ticketId)?.number,
        };
    });
}

export function transactionMappingIdsToNames (users, tickets, searchQuery) {

    let usersIds = [];
    let ticketsIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        usersIds = users.filter(u => u.email.toLowerCase().includes(lowerCaseSearchQuery)).map(u => u.id);
        ticketsIds = tickets.filter(p => p.number.toLowerCase().includes(lowerCaseSearchQuery)).map(p => p.id);
    }

    return searchQuery
        ? {
            $or: [
                { number: { $regex: searchQuery, $options: 'i' } },
                { userId: { $in: usersIds } },
                { ticketId: { $in: ticketsIds } },
            ],
        }
        : {};
}
