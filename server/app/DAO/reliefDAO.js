import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';
import metadataService from "../service/metadataService";

const reliefSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    type: {type: Number, required: true},
    discountPercentage: {type: Number, required: true},
}, {
    collection: 'relief'
});

reliefSchema.plugin(uniqueValidator);

const ReliefModel = mongoose.model('relief', reliefSchema);

async function createNewOrUpdateRelief(relief) {
    return Promise.resolve().then(() => {

        if (!relief.id) {
            return new ReliefModel(relief).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return ReliefModel.findByIdAndUpdate(relief.id, _.omit(relief, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    });
}

async function getReliefByName(name) {
    const result = await ReliefModel.findOne({$or: [{name: name}]});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Relief not found');
}

async function getAllReliefs() {
    const result = await ReliefModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No reliefs in the database');
}

async function getReliefById(id) {
    const result = await ReliefModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Relief not found');
}

async function removeReliefById(id) {
    return ReliefModel.findByIdAndRemove(id);
}

export default {
    createNewOrUpdateRelief: createNewOrUpdateRelief,
    getReliefByName: getReliefByName,
    getAllReliefs: getAllReliefs,
    getReliefById: getReliefById,
    removeReliefById: removeReliefById,

    model: ReliefModel
};
