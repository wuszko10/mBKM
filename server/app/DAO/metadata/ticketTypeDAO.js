import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";


const ticketTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
}, {
    collection: 'ticketType'
});

ticketTypeSchema.plugin(uniqueValidator);

const TicketTypeModel = mongoose.model('ticketType', ticketTypeSchema);
async function get() {
    const result = await TicketTypeModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No ticket types in the database');
}

export default {
    get:get,
    model: TicketTypeModel,
}
