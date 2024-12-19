import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../../service/applicationException';
import mongoConverter from '../../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const walletSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
}, {
    collection: 'wallet'
});

walletSchema.plugin(uniqueValidator);

const WalletModel = mongoose.model('wallet', walletSchema);

async function createNewOrUpdate(wallet) {

    return Promise.resolve().then(() => {
        if (!wallet.id) {

            console.log("Tytaj");
            return new  WalletModel(wallet).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return WalletModel.findByIdAndUpdate(wallet.id, _.omit(wallet, 'id'), { new: true });
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    });
}

async function updateWallet(walletId, newAmount) {
    const result = await WalletModel.findByIdAndUpdate(
        walletId,
        {$inc: {amount: Number(newAmount)}},
        { new: true }
    );
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Wallet not found');
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
    addAmountWallet: updateWallet,

    model: WalletModel
};
