import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";
import Promise from "bluebird";
import * as _ from "lodash";

const paymentCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true},
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
}, {
    collection: 'paymentCard'
});

paymentCardSchema.plugin(uniqueValidator);

const PaymentCardModel = mongoose.model('paymentCard', paymentCardSchema);


async function createNewOrUpdate(card) {
    return Promise.resolve().then(() => {

        if (!card.id) {
            return new PaymentCardModel(card).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return PaymentCardModel.findByIdAndUpdate(card.id, _.omit(card, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    });
}

async function getById(id) {
    const result = await PaymentCardModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No payments methods in the database');
}

async function removeById(id) {
    return PaymentCardModel.findByIdAndRemove(id);
}

export default {
    getCardById:getById,
    createNewOrUpdateCard: createNewOrUpdate,
    removeCardById: removeById,
    model: PaymentCardModel,
}
