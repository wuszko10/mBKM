export function getMetadataNames (transactions, tickets, users) {
    const transactionsArray = Array.isArray(transactions) ? transactions : [];

    return transactionsArray.map(transaction => {
        const transactionObj = transaction.toObject();

        const user = users.find(u => u.id === transaction.userId.toString());
        const ticket = tickets.find(t => t.transactionId.toString() === transaction._id.toString());

        return {
            ...transactionObj,
            userEmail: user?.email,
            ticketNumber: ticket?.number,
        };
    });
}

export function transactionMappingIdsToNames (users, tickets, searchQuery) {

    let usersIds = [];
    let ticketIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        usersIds = users.filter(u => u.email.toLowerCase().includes(lowerCaseSearchQuery)).map(u => u.id);
        ticketIds = tickets.filter(u => u.number.toLowerCase().includes(lowerCaseSearchQuery)).map(t => t.transactionId);
    }

    return searchQuery
        ? {
            $or: [
                { number: { $regex: searchQuery, $options: 'i' } },
                { userId: { $in: usersIds } },
                { _id: { $in: ticketIds } },
            ],
        }
        : {};
}
