import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";


const statusTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
}, {
    collection: 'ticketStatusType'
});

statusTypeSchema.plugin(uniqueValidator);

const StatusTypeModel = mongoose.model('ticketStatusType', statusTypeSchema);
async function get() {
    const result = await StatusTypeModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No status types in the database');
}

async function getByName(name) {
    return StatusTypeModel.findOne({name: name});
}

export default {
    get:get,
    getStatusByName: getByName,

    model: StatusTypeModel,
}
