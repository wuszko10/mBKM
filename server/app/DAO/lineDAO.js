import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const lineSchema = new mongoose.Schema({
    number: {type: String, required: true, unique: true},
    name: {type: String, required: true}
}, {
    collection: 'line'
});

lineSchema.plugin(uniqueValidator);

const LineModel = mongoose.model('line', lineSchema);

async function createNewOrUpdate(line) {
    return Promise.resolve().then(() => {

        if (!line.id) {
            return new LineModel(line).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return LineModel.findByIdAndUpdate(line.id, _.omit(line, 'id'), {new: true});
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
                { number: { $regex: searchQuery, $options: 'i' } },
                { name: { $regex: searchQuery, $options: 'i' } },
            ],
        }
        : {};

    try {
        const totalRecords = await LineModel.countDocuments(searchCriteria);

        const lines = await LineModel.find(searchCriteria)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return {
            data: lines,
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
    const result = await LineModel.find();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'No reliefs in the database');
}

async function getById(id) {
    const result = await LineModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Relief not found');
}

async function removeById(id) {
    return LineModel.findByIdAndRemove(id);
}

export default {
    createNewOrUpdate:createNewOrUpdate,
    getAndSearch:getAndSearch,
    getAll: getAll,
    getById:getById,
    removeById:removeById,

    model: LineModel
};
