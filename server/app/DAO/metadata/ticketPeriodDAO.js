import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";


const ticketPeriodSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
}, {
    collection: 'ticketPeriod'
});

ticketPeriodSchema.plugin(uniqueValidator);

const TicketPeriodModel = mongoose.model('ticketPeriod', ticketPeriodSchema);

async function get() {
    const result = await TicketPeriodModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No ticket periods in the database');
}

async function getById(id) {
    const result = await TicketPeriodModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}

export default {
    get:get,
    getTicketPeriodById: getById,
    model: TicketPeriodModel,
}
