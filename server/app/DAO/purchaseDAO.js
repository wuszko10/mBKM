import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Promise from "bluebird";
import mongoConverter from "../service/mongoConverter";
import * as _ from "lodash";
import applicationException from "../service/applicationException";

const method = {
    wallet: 'wallet',
    card: 'card',
    blik: 'blik',
};

const methods = [method.wallet, method.card, method.blik];

const purchaseSchema = new mongoose.Schema({
    number: {type: Number, required: true, unique: true },
    ticketId: {type: mongoose.Schema.Types.ObjectId, ref: 'ticket', required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    amount: {type: Number, required: true},
    purchaseDate: { type: Date, required: true },
    method: { type: String, enum: methods, required: true },
}, {
    collection: 'purchase'
});

purchaseSchema.plugin(uniqueValidator);


const PurchaseModel = mongoose.model('purchase', purchaseSchema);

const generateTransactionNumber = async () => {
    const lastPurchase = await PurchaseModel.findOne().sort({ number: -1 });
    const lastNumber = lastPurchase ? parseInt(lastPurchase.number.slice(2)) : 0;
    return `TP${(lastNumber + 1).toString().padStart(6, '0')}`
};
function createNewOrUpdatePurchase(transaction) {

    return Promise.resolve().then(async() => {

        if (!transaction.id) {
            transaction.number = await generateTransactionNumber();
            return new PurchaseModel(transaction).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            })
        } else {
            return PurchaseModel.findByIdAndUpdate(transaction.id, _.omit(transaction, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    })
}
async function getAndSearchPurchase(page, pageSize, searchQuery, users, tickets) {

    let usersIds = [];
    let ticketsIds = [];

    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        usersIds = users.filter(u => u.email.toLowerCase().includes(lowerCaseSearchQuery)).map(u => u.id);
        ticketsIds = tickets.filter(p => p.number.toLowerCase().includes(lowerCaseSearchQuery)).map(p => p.id);
    }

    const searchCriteria = searchQuery
        ? {
            $or: [
                { number: { $regex: searchQuery, $options: 'i' } },
                { userId: { $in: usersIds } },
                { ticketId: { $in: ticketsIds } },
            ],
        }
        : {};

    try {
        const totalRecords = await PurchaseModel.countDocuments(searchCriteria);

        const purchases = await PurchaseModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const purchasesArray = Array.isArray(purchases) ? purchases : [];

        const transformedPurchases = purchasesArray.map(purchase => {
            const purchaseObj = purchase.toObject();
            return {
                ...purchaseObj,
                userEmail: users.find(u => u.id === purchase.userId.toString())?.email,
                numberTicket: tickets.find(u => u.id === purchase.ticketId.toString())?.number,
            };
        });

        return {
            data: transformedPurchases,
            page,
            pageSize,
            totalPages: Math.ceil(totalRecords / pageSize),
            totalRecords,
        };
    } catch (error) {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while getting tickets');
    }
}

async function getPurchaseByUserId(id) {
    const result = await PurchaseModel.find({ user: id });
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getPurchase(id) {
    const result = await PurchaseModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Ticket not found');
}


export default {
    createNewOrUpdatePurchase: createNewOrUpdatePurchase,
    getAndSearchPurchase: getAndSearchPurchase,
    getPurchaseByUserId: getPurchaseByUserId,
    getPurchase: getPurchase,

    model: PurchaseModel,
};
