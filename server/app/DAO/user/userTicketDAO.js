import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Promise from "bluebird";
import mongoConverter from "../../service/mongoConverter";
import * as _ from "lodash";
import applicationException from "../../service/applicationException";
import QRCode from 'qrcode'

const ticketSchema = new mongoose.Schema({
    number: {type: String, required: true, unique: true },
    transactionId: {type: mongoose.Schema.Types.ObjectId, ref: 'transaction', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    ticketId: {type: mongoose.Schema.Types.ObjectId, ref: 'ticket', required: true},
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
    const lastNumber = last ? parseInt(last.number.slice(3)) : 0;
    return `BLT${(lastNumber + 1).toString().padStart(6, '0')}`
};

function createNewOrUpdate(userTicket) {

    return Promise.resolve().then(async() => {

        if (!userTicket.id) {
            userTicket.number = await generateTransactionNumber();

            userTicket.QRCode = await QRCode.toDataURL(userTicket.number);

            return new UserTicketModel(userTicket).save().then(result => {
                if (result) {
                    return result;
                }
            })
        } else {
            return UserTicketModel.findByIdAndUpdate(userTicket.id, _.omit(userTicket, 'id'), {new: true});
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

async function getByTransactionId(id) {
    const result = await UserTicketModel.findOne({ transactionId: id });
    if (result) {
        return result;
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

async function updateMany (date, currentStatus, invalidStatus) {
    await UserTicketModel.updateMany(
        { ticketEndDate: { $lt: date }, statusId: currentStatus._id },
        { $set: { statusId: invalidStatus._id } }
    );
}

async function removeById(id) {
    return UserTicketModel.findByIdAndRemove(id);
}


export default {
    createNewOrUpdateUserTicket: createNewOrUpdate,
    getUserTicketByUserId: getByUserId,
    getUserTicketById: get,
    getUserTicketByTransactionId: getByTransactionId,
    updateManyUserTickets: updateMany,
    removeTicketById: removeById,

    model: UserTicketModel,
};
