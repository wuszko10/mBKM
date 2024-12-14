import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";

const paymentMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    entypoIcon: { type: String, required: true },
}, {
    collection: 'paymentMethod'
});

paymentMethodSchema.plugin(uniqueValidator);

const PaymentMethodModel = mongoose.model('paymentMethod', paymentMethodSchema);

async function get() {
    const result = await PaymentMethodModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No payments methods in the database');
}

export default {
    get:get,
    model: PaymentMethodModel,
}
