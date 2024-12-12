import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Promise from "bluebird";
import mongoConverter from "../../service/mongoConverter";
import * as _ from "lodash";
import applicationException from "../../service/applicationException";

const ticketSchema = new mongoose.Schema({
    number: {type: Number, required: true, unique: true },
    ticketId: {type: mongoose.Schema.Types.ObjectId, ref: 'ticket', required: true},
    transactionId: {type: mongoose.Schema.Types.ObjectId, ref: 'transaction', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    price: {type: Number, required: true, trim: true },
    ticketStartDate: { type: Date, required: false },
    ticketEndDate: { type: Date, required: false },
    QRCode: { type: String, required: false },
    statusId: { type: mongoose.Schema.Types.ObjectId, ref: 'ticketStatusType', required: true },
}, {
    collection: 'userTicket'
});

ticketSchema.plugin(uniqueValidator);


const UserTicketModel = mongoose.model('userTicket', ticketSchema);

const generateTransactionNumber = async () => {
    const last = await UserTicketModel.findOne().sort({ number: -1 });
    const lastNumber = last ? parseInt(last.number.slice(2)) : 0;
    return `BLT${(lastNumber + 1).toString().padStart(6, '0')}`
};
function createNewOrUpdate(ticket) {

    return Promise.resolve().then(async() => {

        if (!ticket.id) {
            ticket.number = await generateTransactionNumber();
            return new UserTicketModel(ticket).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            })
        } else {
            return UserTicketModel.findByIdAndUpdate(ticket.id, _.omit(ticket, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    })
}

async function getByUserId(id) {
    const result = await UserTicketModel.find({ userId: id });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}

async function get(id) {
    const result = await UserTicketModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}


export default {
    createNewOrUpdateUserTicket: createNewOrUpdate,
    getUserTicketByUserId: getByUserId,
    getUserTicketById: get,

    model: UserTicketModel,
};
