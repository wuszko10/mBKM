import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Promise from "bluebird";
import mongoConverter from "../../service/mongoConverter";
import * as _ from "lodash";
import applicationException from "../../service/applicationException";
import QRCode from 'qrcode'
import {addTime} from "../../service/userTicket.service";
import TicketDAO from "../ticketDAO";
import TicketPeriodDAO from "../metadata/ticketPeriodDAO";

const ticketSchema = new mongoose.Schema({
    number: {type: String, required: true, unique: true },
    transactionId: {type: mongoose.Schema.Types.ObjectId, ref: 'transaction', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    ticketId: {type: mongoose.Schema.Types.ObjectId, ref: 'ticket', required: true},
    reliefId: {type: mongoose.Schema.Types.ObjectId, ref: 'relief', required: true},
    price: {type: Number, required: true},
    purchaseDate: { type: Date, required: true },
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

            userTicket.QRCode = await QRCode.toDataURL(userTicket.number, {
                width: 400,
            });

            if (userTicket.startDate) {

                const startDate = new Date(userTicket.startDate);
                const currentDate = new Date();

                if (startDate.toDateString() === currentDate.toDateString()) {
                    startDate.setHours(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());
                    userTicket.statusId = '675c1ca31c33663091557e95';
                } else {
                    startDate.setHours(0, 0, 0, 0);
                }

                const ticketType = await TicketDAO.getTicket(userTicket.ticketId);
                const period = await TicketPeriodDAO.getTicketPeriodById(ticketType.period);

                const endTime = addTime(startDate.toISOString(), period.period);

                const endTimeDate = new Date(endTime);
                endTimeDate.setHours(23, 59, 59, 999);

                userTicket.ticketStartDate = startDate.toISOString();
                userTicket.ticketEndDate = endTimeDate.toISOString();

                delete userTicket.startDate;
            }

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
    const result = await UserTicketModel.find({ userId: id }).sort({ _id: -1 });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}

async function getToValidateByUserId(id) {
    const result = await UserTicketModel.find({ userId: id, statusId: '675c1c4e1c33663091557e94' }).sort({ _id: -1 });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}

async function getValidatedByUserId(id) {
    const currentDate = new Date();
    const result = await UserTicketModel.find({ userId: id, statusId: '675c1ca31c33663091557e95',ticketEndDate: { $gt: currentDate } }).sort({ _id: -1 });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}

async function getByTransactionId(id) {
    const result = await UserTicketModel.findOne({ transactionId: id });
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

async function updateMany (date, currentStatus, invalidStatus) {
    await UserTicketModel.updateMany(
        { ticketEndDate: { $lt: date }, statusId: currentStatus._id },
        { $set: { statusId: invalidStatus._id } }
    );
}

async function getAll () {
    const result = await UserTicketModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Tickets not found');
}

async function removeById(id) {
    return UserTicketModel.findByIdAndRemove(id);
}


export default {
    createNewOrUpdateUserTicket: createNewOrUpdate,
    getUserTicketByUserId: getByUserId,
    getUserTicketToValidateByUserId: getToValidateByUserId,
    getUserTicketValidatedByUserId: getValidatedByUserId,
    getUserTicketById: get,
    getUserTicketByTransactionId: getByTransactionId,
    updateManyUserTickets: updateMany,
    removeUserTicketById: removeById,
    getAllUserTickets: getAll,

    model: UserTicketModel,
};
