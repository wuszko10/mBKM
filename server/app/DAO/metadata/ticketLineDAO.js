import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";


const ticketLineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
}, {
    collection: 'ticketLineCount'
});

ticketLineSchema.plugin(uniqueValidator);

const TicketLineModel = mongoose.model('ticketLineCount', ticketLineSchema);

async function get() {
    const result = await TicketLineModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No ticket lines in the database');
}

export default {
    get:get,
    model: TicketLineModel,
}
