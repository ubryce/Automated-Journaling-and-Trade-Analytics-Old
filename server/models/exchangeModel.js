const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = process.env.API_KEY_HASH;
const iv = crypto.randomBytes(16);

const exchangeModel = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    exchangeName: {type: String, required: true},
    exchangeAPI: {type: String, required: true},
    exchangeSecret: {type: String, required: true},
    iv: {type: String},
    exchange: {type: String, required: true},
});

exchangeModel.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(this.exchangeSecret);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // save encrypted string along with initialization vector in database
    this.exchangeSecret = encrypted.toString('hex');
    this.iv = iv.toString('hex');
});

const Exchange = mongoose.model("Exchange", exchangeModel);

module.exports = {Exchange, key};
