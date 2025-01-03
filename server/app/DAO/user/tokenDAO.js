import mongoose from 'mongoose';
import config from '../../config.js';
import momentWrapper from '../../service/momentWrapper';
import jwt from 'jsonwebtoken';
import mongoConverter from '../../service/mongoConverter';
import applicationException from '../../service/applicationException';
import error from "jsonwebtoken/lib/JsonWebTokenError";

const tokenTypeEnum = {
    authorization: 'authorization'
};

const tokenTypes = [tokenTypeEnum.authorization];

const tokenSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    createDate: {type: Number, required: true},
    type: {type: String, enum: tokenTypes, required: true},
    value: {type: String, required: true}
}, {
    collection: 'token'
});

const TokenModel = mongoose.model('token', tokenSchema);

async function create(user) {
    const access = 'auth';
    const userData = {
        userId: user.id,
        name: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        access: access
    };
    const value = jwt.sign(
        userData,
        config.JwtSecret,
        {
            expiresIn: '24h'
        });
    const result = await TokenModel({
        userId: user.id,
        type: 'authorization',
        value: value,
        createDate: momentWrapper.get().valueOf()
    }).save();
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.BAD_REQUEST, error.message);
}

async function get(tokenValue) {
    const result = await TokenModel.findOne({value: tokenValue});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
}

async function remove(userId, token) {
    const tok = await TokenModel.findOne({userId: userId, value: token});
    const result = await TokenModel.deleteOne(tok);
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
}

async function getByUserId(id) {
    return TokenModel.countDocuments({userId: id});
}

async function deleteExpiredTokens() {
    const now = Math.floor(Date.now() / 1000);

    const tokens = await TokenModel.find({});

    const expiredTokens = tokens.filter(token => {
        try {
            const decoded = jwt.decode(token.value);
            return decoded.exp && decoded.exp < now;
        } catch (err) {
            return false;
        }
    });

    if (expiredTokens.length > 0) {
        const tokenIds = expiredTokens.map(token => token._id);
        await TokenModel.deleteMany({ _id: { $in: tokenIds } });
    }
}

async function countByUserId(id){
    return TokenModel.countDocuments({userId: id});
}

export default {
    create: create,
    get: get,
    remove: remove,
    getByUserId,
    deleteExpiredTokens,
    countTokensByUserId: countByUserId,

    tokenTypeEnum: tokenTypeEnum,
    model: TokenModel
};
