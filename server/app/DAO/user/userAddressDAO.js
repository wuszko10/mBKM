import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../../service/mongoConverter";
import applicationException from "../../service/applicationException";
import Promise from "bluebird";
import * as _ from "lodash";

const userAddressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true},
    fullAddress: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true },
    town: { type: String, required: true, trim: true },
}, {
    collection: 'userAddress'
});

userAddressSchema.plugin(uniqueValidator);

const UserAddressModel = mongoose.model('userAddress', userAddressSchema);

async function createNewOrUpdate(address) {
    return Promise.resolve().then(() => {

        if (!address.id) {
            return new UserAddressModel(address).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return UserAddressModel.findByIdAndUpdate(address.id, _.omit(address, 'id'), {new: true});
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
    const result = await UserAddressModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No payments methods in the database');
}

async function removeById(id) {
    return UserAddressModel.findByIdAndRemove(id);
}

export default {
    createNewOrUpdateAddress: createNewOrUpdate,
    getAddressById:getById,
    removeAddressById:removeById,
    model: UserAddressModel,
}
