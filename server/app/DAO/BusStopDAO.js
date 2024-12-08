import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const busStopSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true}
}, {
    collection: 'busStop'
});

busStopSchema.plugin(uniqueValidator);

const BusStopModel = mongoose.model('busStop', busStopSchema);

async function createNewOrUpdate(stop) {
    return Promise.resolve().then(() => {

        if (!stop.id) {
            return new BusStopModel(stop).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return BusStopModel.findByIdAndUpdate(stop.id, _.omit(stop, 'id'), {new: true});
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    });
}

async function getAndSearch(page, pageSize, searchQuery) {

    const searchCriteria = searchQuery
        ? {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { longitude: { $regex: searchQuery, $options: 'i' } },
                { latitude: { $regex: searchQuery, $options: 'i' }},
            ],
        }
        : {};

    try {
        const totalRecords = await BusStopModel.countDocuments(searchCriteria);

        const stops = await BusStopModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return {
            data: stops,
            page,
            pageSize,
            totalPages: Math.ceil(totalRecords / pageSize),
            totalRecords,
        };
    } catch (error) {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error while getting reliefs');
    }
}

async function getAll() {
    const result = await BusStopModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No reliefs in the database');
}

async function getById(id) {
    const result = await BusStopModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Relief not found');
}

async function removeById(id) {
    return BusStopModel.findByIdAndRemove(id);
}

export default {
    createNewOrUpdate:createNewOrUpdate,
    getAndSearch:getAndSearch,
    getAll: getAll,
    getById:getById,
    removeById:removeById,

    model: BusStopModel
};
