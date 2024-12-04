import applicationException from "./applicationException";
import app from "express/lib/application";

async function validateTicketType(req, ticketTypeId) {

    const { cache } = req.app.locals;

    const ticketTypes = cache.get("ticketTypes");

    if (!ticketTypes) {
        throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, 'Ticket types not loaded.');
    }

    return ticketTypes.some(t => t.id === ticketTypeId);
}

async function validateTicketPeriod(req, ticketPeriodId) {
    const { cache } = req.app.locals;
    const ticketPeriods = cache.get("ticketPeriods");

    if (!ticketPeriods) {
        throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, 'Ticket periods not loaded.');
    }
    return ticketPeriods.some(t => t.id === ticketPeriodId);
}

async function validateTicketLine(req, ticketLineId) {
    const { cache } = req.app.locals;
    const ticketLines = cache.get("ticketLines");

    if (!ticketLines) {
        throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, 'Ticket lines not loaded.');
    }

    return ticketLines.some(t => t.id === ticketLineId);
}

async function validateReliefType(req, reliefTypeId) {
    const { cache } = req.app.locals;
    const reliefTypes = cache.get("reliefTypes");

    if (!reliefTypes){
        throw applicationException.new(applicationException.INTERNAL_SERVER_ERROR, 'Relief types not loaded.');
    }

    return reliefTypes.some(t => t.id === reliefTypeId);
}


export default {
    validateTicketType: validateTicketType,
    validateTicketPeriod: validateTicketPeriod,
    validateTicketLine: validateTicketLine,
    validateReliefType: validateReliefType
}
