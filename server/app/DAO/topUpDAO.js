import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const method = {
    wallet: 'wallet',
    card: 'card',
    blik: 'blik',
};

const methods = [method.wallet, method.card, method.blik];

const topUpSchema = new mongoose.Schema({
    number: {type: Number, required: true, unique: true },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    amount: {type: Number, required: true},
    topUpDate: { type: Date, required: true },
    method: { type: String, enum: methods, required: true },
}, {
    collection: 'topUp'
});

topUpSchema.plugin(uniqueValidator);


const TopUpModel = mongoose.model('topUp', topUpSchema);

const generateTransactionNumber = async () => {
    const lastTopUp = await TopUpModel.findOne().sort({ number: -1 });
    const lastNumber = lastTopUp ? parseInt(lastTopUp.number.slice(2)) : 0;
    return `TD${(lastNumber + 1).toString().padStart(6, '0')}`
};
function createNewOrUpdateTopUp(transaction) {

    return Promise.resolve().then(async() => {

        if (!transaction.id) {
            transaction.number = await generateTransactionNumber();
            return new TopUpModel(transaction).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            })
        } else {
            return TopUpModel.findByIdAndUpdate(transaction.id, _.omit(transaction, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    })
}
async function getAndSearchTopUp(page, pageSize, searchQuery, users) {

    let usersIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        usersIds = users.filter(u => u.email.toLowerCase().includes(lowerCaseSearchQuery)).map(u => u.id);
    }

    const searchCriteria = searchQuery
        ? {
            $or: [
                { number: { $regex: searchQuery, $options: 'i' } },
                { userId: { $in: usersIds } },
            ],
        }
        : {};

    try {
        const totalRecords = await TopUpModel.countDocuments(searchCriteria);

        const topUps = await TopUpModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const ticketsArray = Array.isArray(topUps) ? topUps : [];

        const transformedTopUps = ticketsArray.map(topUp => {
            const topUpObj = topUp.toObject();
            return {
                ...topUpObj,
                userEmail: users.find(u => u.id === topUp.userId.toString())?.email,
            };
        });

        return {
            data: transformedTopUps,
            page,
            pageSize,
            totalPages: Math.ceil(totalRecords / pageSize),
            totalRecords,
        };
    } catch (error) {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while getting tickets');
    }
}

async function getTopUpsByUserId(id) {
    const result = await TopUpModel.find({ userId: id });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getTopUp(id) {
    const result = await TopUpModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}


export default {
    createNewOrUpdateTopUp: createNewOrUpdateTopUp,
    getAndSearchTopUp: getAndSearchTopUp,
    getTopUpsByUserId: getTopUpsByUserId,
    getTopUp: getTopUp,

    model: TopUpModel,
};
