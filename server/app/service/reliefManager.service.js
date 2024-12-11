export function getReliefTypesNames (reliefs, reliefTypes) {
    const reliefsArray = Array.isArray(reliefs) ? reliefs : [];

    return reliefsArray.map(relief => {
        const ticketObj = relief.toObject();

        const type = reliefTypes.find(t => t.id === relief.type.toString());

        return {
            ...ticketObj,
            typeName: type?.name,
            typeLabel: type?.label,
        };
    });
}

export function reliefMappingIdsToNames (reliefTypes, searchQuery) {

    let reliefTypeIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        reliefTypeIds = reliefTypes.filter(t => t.label.toLowerCase().includes(lowerCaseSearchQuery)).map(t => t.id);
    }

    return searchQuery
        ? {
            $or: [
                { name: { $regex: searchQuery.toLowerCase(), $options: 'i' } },
                { type: { $in: reliefTypeIds } },
            ],
        }
        : {}
}
