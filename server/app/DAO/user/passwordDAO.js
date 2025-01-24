import mongoose from 'mongoose';
import * as _ from 'lodash';
import applicationException from '../../service/applicationException';
import mongoConverter from '../../service/mongoConverter';


const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
  password: { type: String, required: true }
}, {
  collection: 'password'
});

const PasswordModel = mongoose.model('password', passwordSchema);

async function createOrUpdate(data) {
  const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, _.omit(data, 'id'), { new: true });
  if (!result) {
    const result = await new PasswordModel({ userId: data.userId, password: data.password }).save();
    if (result) {
      return mongoConverter(result);
    }
  }
  return result;
}

async function authorize(userId, password) {
  const result = await PasswordModel.findOne({ userId: userId, password: password });
  if (result && mongoConverter(result)) {
    return true;
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'User and password does not match');
}

async function resetPassword(userId, password){
  const result = await PasswordModel.findOne({ userId: userId, password: password });
  if (result && mongoConverter(result)) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'User and password does not match');
}

async function restorePassword(userId){
  const result = await PasswordModel.findOne({ userId: userId});
  if (result && mongoConverter(result)) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'User and password does not match');
}

export default {
  createOrUpdate: createOrUpdate,
  authorize: authorize,
  resetPassword,
  restorePassword,

  model: PasswordModel
};
