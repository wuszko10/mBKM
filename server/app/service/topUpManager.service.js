export function getTopUpUserNames (topUps, paymentMethods, users) {
    const topUpsArray = Array.isArray(topUps) ? topUps : [];

    return topUpsArray.map(topUp => {
        const topUpObj = topUp.toObject();

        const user = users.find(u => u.id === topUp.userId.toString());
        const method = paymentMethods.find(m => m.id === topUp.methodId.toString());

        return {
            ...topUpObj,
            userEmail: user?.email,
            method: method?.label,
        };
    });
}

export function topUpsMappingIdsToNames (users, paymentMethods, searchQuery) {

    let usersIds = [];
    let methodsIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        usersIds = users.filter(u => u.email.toLowerCase().includes(lowerCaseSearchQuery)).map(u => u.id);
        methodsIds = paymentMethods.filter(m => m.label.toLowerCase().includes(lowerCaseSearchQuery)).map(m => m.id);
    }

    return searchQuery
        ? {
            $or: [
                { number: { $regex: searchQuery, $options: 'i' } },
                { userId: { $in: usersIds } },
                { methodId: { $in: methodsIds } },
            ],
        }
        : {};
}
