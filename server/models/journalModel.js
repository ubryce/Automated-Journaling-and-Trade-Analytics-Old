const mongoose = require('mongoose');

const journalModel = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    journalName: {type: String},
    journalDescription: {type: String},
    journalExchanges:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Exchange"
        },
    ],
    },
    {
        timestamps: true,
    }
);

const Journal = mongoose.model("Journal", journalModel);

module.exports = Journal;