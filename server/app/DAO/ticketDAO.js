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
            console.log(error);
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
    getTicket: getTicket,
    removeTicketById: removeTicketById,

    model: TicketModel,
};
