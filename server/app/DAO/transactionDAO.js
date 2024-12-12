import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Promise from "bluebird";
import mongoConverter from "../service/mongoConverter";
import * as _ from "lodash";
import applicationException from "../service/applicationException";

const paymentMethod = {
    progress: 'progress',
    completed: 'completed',
    invalid: 'invalid',
}

const paymentMethods = [paymentMethod.progress, paymentMethod.completed,paymentMethod.invalid];

const transactionSchema = new mongoose.Schema({
    number: {type: Number, required: true, unique: true },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    finalPrice: {type: Number, required: true, trim: true },
    currency: { type: Boolean, default: 'PLN', required: true },
    paymentDate: { type: Date, required: true },
    referenceId: { type: String, required: false },
    methodId: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentMethod', required: true },
    status: { type: String, enum: paymentMethods, default: paymentMethod.progress , required: true },
}, {
    collection: 'transaction'
});

transactionSchema.plugin(uniqueValidator);

const TransactionModel = mongoose.model('transaction', transactionSchema);

const generateTransactionNumber = async () => {
    const lastTransaction = await TransactionModel.findOne().sort({ number: -1 });
    const lastNumber = lastTransaction ? parseInt(lastTransaction.number.slice(2)) : 0;
    return `TP${(lastNumber + 1).toString().padStart(6, '0')}`
};
function createNewOrUpdate(transaction) {

    return Promise.resolve().then(async() => {

        if (!transaction.id) {
            transaction.number = await generateTransactionNumber();
            return new TransactionModel(transaction).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            })
        } else {
            return TransactionModel.findByIdAndUpdate(transaction.id, _.omit(transaction, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    })
}
async function getAndSearch(page, pageSize, searchCriteria) {
    try {
        const totalRecords = await TransactionModel.countDocuments(searchCriteria);

        const transactions = await TransactionModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return {
            data: transactions,
            page,
            pageSize,
            totalPages: Math.ceil(totalRecords / pageSize),
            totalRecords,
        };
    } catch (error) {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while getting transactions');
    }
}

async function getByUserId(id) {
    const result = await TransactionModel.find({ user: id });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Transaction not found');
}

async function get(id) {
    const result = await TransactionModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Transaction not found');
}


export default {
    createNewOrUpdateTransaction: createNewOrUpdate,
    getAndSearchTransaction: getAndSearch,
    getTransactionByUserId: getByUserId,
    getTransactionById: get,

    model: TransactionModel,
};
