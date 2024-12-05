import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';


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

function createNewOrUpdateTicket(ticket) {

    return Promise.resolve().then(() => {

        if (!ticket.id) {

            return new TicketModel(ticket).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            })
        } else {
            return TicketModel.findByIdAndUpdate(ticket.id, _.omit(ticket, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    })
}


// async function getByEmailOrName(name) {
//     const result = await UserModel.findOne({$or: [{email: name}, {name: name}]});
//     if (result) {
//         return mongoConverter(result);
//     }
//     throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
// }


async function getAndSearchTicket(page, pageSize, searchQuery, cache ) {

    const ticketTypes = cache.get("ticketTypes");
    const ticketPeriods = cache.get("ticketPeriods");
    const ticketLines = cache.get("ticketLines");

    console.log("Search query:", searchQuery);


    let typeIds = [];
    let periodIds = [];
    let lineIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        typeIds = ticketTypes.filter(t => t.label.toLowerCase().includes(lowerCaseSearchQuery)).map(t => t.id);
        periodIds = ticketPeriods.filter(p => p.label.toLowerCase().includes(lowerCaseSearchQuery)).map(p => p.id);
        lineIds = ticketLines.filter(l => l.label.toLowerCase().includes(lowerCaseSearchQuery)).map(l => l.id);
    }

    const searchCriteria = searchQuery
        ? {
            $or: [
                { type: { $in: typeIds } },
                { lines: { $in: lineIds } },
                { period: { $in: periodIds } },
            ],
        }
        : {};

    try {
        const totalRecords = await TicketModel.countDocuments(searchCriteria);

        const tickets = await TicketModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const ticketsArray = Array.isArray(tickets) ? tickets : [];

        const transformedTickets = ticketsArray.map(ticket => {
            const ticketObj = ticket.toObject();
            return {
                ...ticketObj,
                typeName: ticketTypes.find(t => t.id === ticket.type.toString())?.label,
                periodName: ticketPeriods.find(p => p.id === ticket.period.toString())?.label,
                lineName: ticketLines.find(l => l.id === ticket.lines.toString())?.label,
            };
        });

        return {
            data: transformedTickets,
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
    const result = await TicketModel.find();
    if (result) {
        return mongoConverter(result);
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
