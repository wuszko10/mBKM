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

        const targetDate = new Date(ticket.offerStartDate || Date.now());
        targetDate.setDate(targetDate.getDate() - 1);
        targetDate.setHours(22, 59, 59, 999);

        const overlappingTickets = TicketModel.find({
            type: ticket.type,
            lines: ticket.lines,
            period: ticket.period,
            $and: [
                {
                    $and: [
                        { $or: [{ offerEndDate: null }, { offerEndDate: {$exists: false} }, { offerEndDate: { $gte: ticket.offerStartDate } }] },
                        { offerStartDate: { $lte: targetDate } },
                    ],
                },
                {
                    $and: [
                        { $or: [{ offerEndDate: null }, { offerEndDate: {$exists: false} }, { offerEndDate: { $gte: targetDate } }] },
                        { offerStartDate: { $lte: ticket.offerStartDate } },
                    ],
                },
            ]
        });


        // Jeśli istnieje kolizja, rzucamy wyjątek
        if (overlappingTickets.length > 0) {
            throw applicationException.new(
                applicationException.BAD_REQUEST,
                'Bilet z podanymi parametrami i datami już istnieje lub daty nachodzą się na inne bilety.'
            );
        }

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



async function getAndSearchTicket(page, pageSize, searchCriteria) {

    try {
        const totalRecords = await TicketModel.countDocuments(searchCriteria);

        const tickets = await TicketModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

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
    const currentDate = new Date();

    const result = await TicketModel.find({
        offerStartDate: { $lte: currentDate },
        $or: [
            { offerEndDate: { $exists: false } },
            { offerEndDate: { $gte: currentDate } },
            { offerEndDate: null},
        ]
    }).sort({ _id: -1 });
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

    console.log("id: " + id)

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
