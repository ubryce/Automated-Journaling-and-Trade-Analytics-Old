const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const exchangeModel = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    exchangeName: {type: String, required: true},
    exchangeAPI: {type: String, required: true},
    exchangeSecret: {type: String, required: true},
    iv: {type: String},
    exchange: {type: String, required: true},
});

// exchangeModel.pre('save', async function (next) {
//     if (!this.isModified) {
//         next()
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.exchangeSecret = await bcrypt.hash(this.exchangeSecret, salt);
// });

exchangeModel.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(this.exchangeSecret, "utf-8", 'hex');
    encrypted += cipher.final("hex");

    const base64data = Buffer.from(iv, 'binary').toString('base64');

    this.exchangeSecret = encrypted;
    this.iv = base64data;
    console.log(this.exchangeSecret)
});

const Exchange = mongoose.model("Exchange", exchangeModel);

module.exports = Exchange;