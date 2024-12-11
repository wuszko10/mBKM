export function getMetadataNames (tickets, ticketTypes, ticketPeriods, ticketLines) {
    const ticketsArray = Array.isArray(tickets) ? tickets : [];

    return ticketsArray.map(ticket => {
        const ticketObj = ticket.toObject();

        const type = ticketTypes.find(t => t.id === ticket.type.toString());
        const period = ticketPeriods.find(p => p.id === ticket.period.toString());
        const line = ticketLines.find(l => l.id === ticket.lines.toString());

        return {
            ...ticketObj,
            typeName: type?.name,
            typeLabel: type?.label,
            periodName: period?.name,
            periodLabel: period?.label,
            lineName: line?.name,
            lineLabel: line?.label,
        };
    });
}

export function mappingIdsToNames (ticketTypes, ticketPeriods, ticketLines, searchQuery) {

    let typeIds = [];
    let periodIds = [];
    let lineIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        typeIds = ticketTypes.filter(t => t.label.toLowerCase().includes(lowerCaseSearchQuery)).map(t => t.id);
        periodIds = ticketPeriods.filter(p => p.label.toLowerCase().includes(lowerCaseSearchQuery)).map(p => p.id);
        lineIds = ticketLines.filter(l => l.label.toLowerCase().includes(lowerCaseSearchQuery)).map(l => l.id);
    }

    return searchQuery
        ? {
            $or: [
                {type: {$in: typeIds}},
                {lines: {$in: lineIds}},
                {period: {$in: periodIds}},
            ],
        }
        : {}
}
