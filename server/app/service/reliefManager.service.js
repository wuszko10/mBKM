export function getReliefTypesNames (reliefs, reliefTypes, ticketTypes) {
    const reliefsArray = Array.isArray(reliefs) ? reliefs : [];

    return reliefsArray.map(relief => {
        const ticketObj = relief.toObject();

        const type = reliefTypes.find(t => t.id === relief.type.toString());
        const ticketType = ticketTypes.find(t => t.id === relief.ticketType.toString());

        return {
            ...ticketObj,
            typeName: type?.name,
            typeLabel: type?.label,
            ticketTypeName: ticketType?.name,
            ticketTypeLabel: ticketType?.label,
        };
    });
}

export function reliefMappingIdsToNames (reliefTypes, ticketTypes, searchQuery) {

    let reliefTypeIds = [];
    let ticketTypeIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        reliefTypeIds = reliefTypes.filter(t => t.label.toLowerCase().includes(lowerCaseSearchQuery)).map(t => t.id);
        ticketTypeIds = ticketTypes.filter(t => t.label.toLowerCase().includes(lowerCaseSearchQuery)).map(t => t.id);
    }

    return searchQuery
        ? {
            $or: [
                { name: { $regex: searchQuery.toLowerCase(), $options: 'i' } },
                { type: { $in: reliefTypeIds } },
                { ticketType: { $in: ticketTypeIds } },
            ],
        }
        : {}
}
