export function generateDateRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

export function countTransactionsByDay(transactions, days) {
    const today = new Date(Date.now());
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days);

    const allDates = generateDateRange(startDate, today);

    const transactionsMap = transactions.reduce((acc, transaction) => {
        const date = (transaction?.paymentDate || transaction?.purchaseDate)?.split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    return allDates.map((date) => ({
        date,
        transactionCount: transactionsMap[date] || 0,
    }));
}
