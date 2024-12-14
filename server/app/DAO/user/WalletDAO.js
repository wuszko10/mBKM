import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../../service/applicationException';
import mongoConverter from '../../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const walletSchema = new mongoose.Schema({
    amount: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
}, {
    collection: 'wallet'
});

walletSchema.plugin(uniqueValidator);

const WalletModel = mongoose.model('wallet', walletSchema);

async function createNewOrUpdate(data) {

    const result = await WalletModel.findOneAndUpdate({ userId: data.userId }, _.omit(data, 'id'), { new: true });

    if (!result) {
        const result = await new WalletModel({ userId: data.userId, amount: 0 }).save();
        if (result) {
            return mongoConverter(result);
        }
    }
}

async function getById(id) {
    const result = await WalletModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Relief not found');
}

async function getByUserId(id) {
    const result = await WalletModel.findOne({userId: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Relief not found');
}

async function removeById(id) {
    return WalletModel.findByIdAndRemove(id);
}

export default {
    createNewOrUpdateWallet: createNewOrUpdate,
    getWalletByUserId: getByUserId,
    getWalletById: getById,
    removeWalletById: removeById,

    model: WalletModel
};
