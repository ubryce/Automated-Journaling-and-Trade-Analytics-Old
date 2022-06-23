const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const exchangeModel = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    exchangeName: {type: String},
    exchangeAPI: {type: String, required: true},
    exchangeSecret: {type: String, required: true},
});

exchangeModel.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.exchangeSecret = await bcrypt.hash(this.exchangeSecret, salt);
});

const Exchange = mongoose.model("Exchange", exchangeModel);

module.exports = Exchange;