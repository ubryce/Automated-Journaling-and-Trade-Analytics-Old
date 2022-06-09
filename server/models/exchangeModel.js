const mongoose = require('mongoose');

const exchangeModel = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    exchangeName: {type: String},
    exchangeAPI: {type: String},
    exchangeSecret: {type: String},
});

const Exchange = mongoose.model("Exchange", exchangeModel);

module.exports = Exchange;