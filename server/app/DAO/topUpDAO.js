import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const paymentMethodStatus = {
    progress: 'progress',
    completed: 'completed',
    invalid: 'invalid',
}

const paymentMethodStatuses = [paymentMethodStatus.progress, paymentMethodStatus.completed,paymentMethodStatus.invalid];

const topUpSchema = new mongoose.Schema({
    number: {type: String, required: true, unique: true },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    amount: {type: Number, required: true},
    currency: { type: String, default: 'PLN', required: false },
    paymentDate: { type: Date, required: true },
    referenceId: { type: String, required: false },
    methodId: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentMethod', required: true },
    status: { type: String, enum: paymentMethodStatuses, default: paymentMethodStatus.progress , required: false },
}, {
    collection: 'topUp'
});

topUpSchema.plugin(uniqueValidator);


const TopUpModel = mongoose.model('topUp', topUpSchema);

const generateTopUpNumber = async () => {
    const lastTopUp = await TopUpModel.findOne().sort({ number: -1 });
    const lastNumber = lastTopUp ? parseInt(lastTopUp.number.slice(2)) : 0;
    return `TD${(lastNumber + 1).toString().padStart(6, '0')}`
};
function createNewOrUpdate(topUp) {

    return Promise.resolve().then(async() => {
        if (!topUp.id) {
            topUp.number = await generateTopUpNumber();
            return new TopUpModel(topUp).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            })
        } else {
            return TopUpModel.findByIdAndUpdate(topUp.id, _.omit(topUp, 'id'), {new: true});
        }
    })
        .catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    })
}
async function getAndSearch(page, pageSize, searchCriteria) {


    try {
        const totalRecords = await TopUpModel.countDocuments(searchCriteria);

        const topUps = await TopUpModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ _id: -1 });

        return {
            data: topUps,
            page,
            pageSize,
            totalPages: Math.ceil(totalRecords / pageSize),
            totalRecords,
        };
    } catch (error) {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while getting tickets');
    }
}

async function getByUserId(id) {
    const result = await TopUpModel.find({ userId: id }).sort({ _id: -1 });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getById(id) {
    const result = await TopUpModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}

async function countByUserId(id){
    return TopUpModel.countDocuments({userId: id});
}

async function removeById(id) {
    return TopUpModel.findByIdAndRemove(id);
}

async function deleteInvalidTopUps() {
    return TopUpModel.deleteMany({ status: "progress" });
}

export default {
    createNewOrUpdateTopUp: createNewOrUpdate,
    getAndSearchTopUp: getAndSearch,
    getTopUpsByUserId: getByUserId,
    getTopUpById: getById,
    removeTopUpById: removeById,
    countTopUpsByUserId: countByUserId,
    deleteInvalidTopUps,

    model: TopUpModel,
};
