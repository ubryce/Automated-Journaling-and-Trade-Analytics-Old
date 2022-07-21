const mongoose = require('mongoose');

const journalModel = mongoose.Schema(
    {
        users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        journalName: {type: String},
        journalDescription: {type: String},
        journalExchanges:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Exchange"
            },
        ],
        journalTrades:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Trade"
            },
        ],
        latestTrade: {type: mongoose.Schema.Types.ObjectId, ref: "Trade"},
        journalAdmin: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    },
    {
        timestamps: true,
    }
);

const Journal = mongoose.model("Journal", journalModel);

module.exports = Journal;