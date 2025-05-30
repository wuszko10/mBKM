import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';
import {checkForDateOverlap} from "../service/ticketManager.service";


const ticketSchema = new mongoose.Schema({
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'ticketType', required: true},
    lines: {type: mongoose.Schema.Types.ObjectId, ref: 'ticketLineCount', required: true},
    period: {type: mongoose.Schema.Types.ObjectId, ref: 'ticketPeriod', required: false},
    price: {type: Number, required: true},
    offerStartDate: { type: Date, required: true },
    offerEndDate: { type: Date, required: false },
}, {
    collection: 'ticket'
});

ticketSchema.plugin(uniqueValidator);

const TicketModel = mongoose.model('ticket', ticketSchema);


async function createNewOrUpdateTicket(ticket) {

    return Promise.resolve().then(async () => {

        if (!ticket.id) {

            const overlappingTickets = await TicketModel.find({
                $and: [
                    { type: ticket.type },
                    { lines: ticket.lines },
                    { period: ticket.period },
                ],
            });

            const ticketsArray = Array.isArray(overlappingTickets) ? mongoConverter(overlappingTickets) : [];

            if (ticketsArray.length > 0) {
                const isOverlap = checkForDateOverlap(ticket, ticketsArray);
                if (isOverlap.length > 0) {
                    throw "overlapError";
                }
            }

            return new TicketModel(ticket).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            })
        } else {

            const overlappingTickets = await TicketModel.find({
                $and: [
                    { type: ticket.type },
                    { lines: ticket.lines },
                    { period: ticket.period },
                    { _id: { $ne: ticket.id } },
                ],

            });


            const ticketsArray = Array.isArray(overlappingTickets) ? mongoConverter(overlappingTickets) : [];
            if (ticketsArray.length > 0) {
                const isOverlap = checkForDateOverlap(ticket, ticketsArray);
                if (isOverlap.length > 0) {
                    throw "overlapError";
                }
            }

            return TicketModel.findByIdAndUpdate(ticket.id, _.omit(ticket, 'id'), {new: true});

        }
    }).catch(error => {
        if (error === "overlapError") {
            throw applicationException.new(applicationException.CONFLICT,'Bilet z podanymi parametrami i datami już istnieje lub daty nachodzą się na inne bilety.');
        } else if (error.name === 'ValidationError') {
            throw applicationException.new(applicationException.NOT_FOUND, `Błąd walidacji ${error.message}`);
        } else {
            throw error
        }
    })
}

async function getAndSearchTicket(page, pageSize, searchCriteria, removeDuplicates) {

    let totalRecords;
    let tickets;

    try {
        const isRemoveDuplicates = removeDuplicates === 'true';
        if (isRemoveDuplicates) {

            tickets = await TicketModel.aggregate([
                {$match: searchCriteria},
                {
                    $group: {
                        _id: {
                            type: "$type",
                            lines: "$lines",
                            period: "$period"
                        },
                        ticket: {$first: "$$ROOT"}
                    }
                },
                {$replaceRoot: {newRoot: "$ticket"}},
                {$sort: {type: 1, period: -1, _id: -1}},
                {$skip: (page - 1) * pageSize},
                {$limit: Number(pageSize)}
            ]);

            totalRecords = tickets.length;
        } else {

            tickets = await TicketModel.aggregate([
                {$match: searchCriteria},
                {$addFields: {isIndefinite: {$cond: {if: {$eq: ["$offerEndDate", null]}, then: 1, else: 0}}}},
                {$sort: {isIndefinite: -1, offerEndDate: -1, offerStartDate: -1, _id: -1}},
                {$skip: (page - 1) * pageSize},
                {$limit: Number(pageSize)}
            ]);
            totalRecords = tickets.length;
        }

        return {
            data: tickets,
            page,
            pageSize,
            totalPages: Math.ceil(totalRecords / pageSize),
            totalRecords,
        };
    } catch (error) {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while getting tickets');
    }
}


async function getAllTickets() {

    const result = await TicketModel.find().sort({ _id: -1 });
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No tickets in the database')
}

async function getTicket(id) {
    const result = await TicketModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}

async function removeTicketById(id) {

    return TicketModel.findByIdAndRemove(id);
}

export default {
    createNewOrUpdateTicket: createNewOrUpdateTicket,
    getAllTickets: getAllTickets,
    getAndSearchTicket: getAndSearchTicket,
    getTicket: getTicket,
    removeTicketById: removeTicketById,

    model: TicketModel,
};
