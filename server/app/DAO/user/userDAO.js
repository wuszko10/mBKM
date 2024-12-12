import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../../service/applicationException';
import mongoConverter from '../../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';
import sha1 from "sha1";


const userRole = {
  admin: 'admin',
  user: 'user'
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  pesel: { type: Number, required: true, unique: true, trim: true },
  phoneNumber: { type: Number, required: true, trim: true },
  role: { type: String, enum: userRoles, default: userRole.user, required: false },
  active: { type: Boolean, default: true, required: false },
  isAdmin: { type: Boolean, default: false, required: false }
}, {
  collection: 'user'
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('user', userSchema);

function createNewOrUpdate(user) {
  return Promise.resolve().then(() => {
    if (!user.id) {
      return new  UserModel(user).save().then(result => {
        if (result) {
          return mongoConverter(result);
        }
      });
    } else {
      return UserModel.findByIdAndUpdate(user.id, _.omit(user, 'id'), { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}

async function getByEmailOrName(email) {
  const result = await UserModel.findOne({email: email});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getAndSearch(page, pageSize, searchQuery) {

  const searchCriteria = searchQuery
      ? {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { pesel: { $regex: searchQuery, $options: 'i' }},
        ],
      }
      : {};

  try {
    const totalRecords = await UserModel.countDocuments(searchCriteria);

    const stops = await UserModel.find(searchCriteria)
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
    throw applicationException.new(applicationException.BAD_REQUEST, 'Error while getting users');
  }
}

async function getAll() {
  const result = await UserModel.find();
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function get(id) {
  const result = await UserModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function removeById(id) {
  return await UserModel.findByIdAndRemove(id);
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  getAndSearch: getAndSearch,
  removeById: removeById,
  getAll: getAll,

  userRole: userRole,
  model: UserModel
};
