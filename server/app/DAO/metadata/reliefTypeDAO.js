import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";


const reliefTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
}, {
    collection: 'reliefType'
});

reliefTypeSchema.plugin(uniqueValidator);

const ReliefTypeModel = mongoose.model('reliefType', reliefTypeSchema);

async function get() {
    const result = await ReliefTypeModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No relief types in the database');
}

export default {
    get: get,

    model: ReliefTypeModel,
}
