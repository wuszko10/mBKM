import mongoose from "mongoose";

function getNames(ticket, ticketObj, ticketTypes, ticketPeriods, ticketLines) {
    const type = ticketTypes.find(t => t.id.toString() === ticket.type.toString());
    const period = ticketPeriods.find(p => p.id.toString() === ticket.period.toString());
    const line = ticketLines.find(l => l.id.toString() === ticket.lines.toString());

    return {
        ...ticketObj,
        typeName: type?.name,
        typeLabel: type?.label,
        periodName: period?.name,
        periodLabel: period?.label,
        lineName: line?.name,
        lineLabel: line?.label,
    };
}

export function getMetadataNames (tickets, ticketTypes, ticketPeriods, ticketLines) {
    const ticketsArray = Array.isArray(tickets) ? tickets : [];

    return ticketsArray.map(ticket => {
        const ticketObj = ticket.toObject();

        return getNames(ticket, ticketObj, ticketTypes, ticketPeriods, ticketLines);
    });
}

export function getMetadataNamesAggregation (tickets, ticketTypes, ticketPeriods, ticketLines) {
    const ticketsArray = Array.isArray(tickets) ? tickets : [];

    return ticketsArray.map(ticket => {
        const ticketObj = { ...ticket };

        return getNames(ticket, ticketObj, ticketTypes, ticketPeriods, ticketLines);
    });
}

export function mappingIdsToNames (ticketTypes, ticketPeriods, ticketLines, searchQuery) {

    let typeIds = [];
    let periodIds = [];
    let lineIds = [];

    let isMultipleWords = false;

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        const queryWords = lowerCaseSearchQuery.split(' ');
        isMultipleWords = queryWords.length > 1;

        if (isMultipleWords) {

            queryWords.forEach(word => {
                if (['jednorazowy', 'okresowy'].some(type => word.includes(type))) {
                    typeIds = ticketTypes.filter(t => t.label.toLowerCase().includes(word)).map(t => t.id);
                }

                if (/^\d+-(minutowy|miesięczny)$/.test(word)) {
                    periodIds = ticketPeriods.filter(p => p.label.toLowerCase().includes(word)).map(p => p.id);
                }
            });

            if (lowerCaseSearchQuery.includes('wszystkie linie') || lowerCaseSearchQuery.includes('wszystkie')) {
                lineIds = ticketLines.filter(l => l.label.toLowerCase().includes('wszystkie')).map(l => l.id);
            } else if (lowerCaseSearchQuery.includes('jedna linia') || lowerCaseSearchQuery.includes('jedna')){
                lineIds = ticketLines.filter(l => l.label.toLowerCase().includes('jedna')).map(l => l.id);
            }

        } else {
            typeIds = ticketTypes.filter(t => t.label.toLowerCase().includes(lowerCaseSearchQuery)).map(t => t.id);
            periodIds = ticketPeriods.filter(p => p.label.toLowerCase().includes(lowerCaseSearchQuery)).map(p => p.id);
            lineIds = ticketLines.filter(l => l.label.toLowerCase().includes(lowerCaseSearchQuery)).map(l => l.id);
        }
    }

    return searchQuery
        ? isMultipleWords
            ? {
                $and: [
                    { type: { $in: typeIds.map(id => new mongoose.Types.ObjectId(id)) } },
                    { lines: { $in: lineIds.map(id => new mongoose.Types.ObjectId(id)) } },
                    { period: { $in: periodIds.map(id => new mongoose.Types.ObjectId(id)) } },
                ]
            }
            : {
                $or: [
                    { type: { $in: typeIds.map(id => new mongoose.Types.ObjectId(id)) } },
                    { lines: { $in: lineIds.map(id => new mongoose.Types.ObjectId(id)) } },
                    { period: { $in: periodIds.map(id => new mongoose.Types.ObjectId(id)) } },
                ]
            }
        : {};
}

export function checkForDateOverlap(ticket, ticketsArray) {
    const responseTicketStartDate = new Date(ticket.offerStartDate).toISOString();
    const responseTicketEndDate = ticket.offerEndDate
        ? new Date(ticket.offerEndDate).toISOString() : '';

    return ticketsArray.filter(existingTicket => {
        const filterTicketStartDate = new Date(existingTicket.offerStartDate).toISOString();
        const filterTicketEndDate =
            existingTicket.offerEndDate
                ? new Date(existingTicket.offerEndDate).toISOString() : '';

        const isEndDateValid = filterTicketEndDate === ''
            || filterTicketEndDate >= responseTicketStartDate;
        const isStartDateValid = responseTicketEndDate === ''
            || filterTicketStartDate >= responseTicketEndDate
            || filterTicketEndDate === '';

        return (isEndDateValid && isStartDateValid);
    });
}
