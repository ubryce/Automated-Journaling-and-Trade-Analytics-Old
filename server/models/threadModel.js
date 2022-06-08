const mongoose = require('mongoose');

const threadModel = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: {type: String},
    picture: {type: String},
    trade: {type: mongoose.Schema.Types.ObjectId, ref: "Trade"},
    },
    {
        timestamps: true,
    }
);

const Thread = mongoose.model("Thread", threadModel);

module.exports = Thread;