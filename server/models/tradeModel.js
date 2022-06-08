const mongoose = require('mongoose');

const tradeModel = mongoose.Schema(
    {
        user:
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref:"User"
            },
        openDate:{type: Date},
        closeDate:{type: Date},
        side:{type: String},
        exchange:{type: String},
        symbol:{type: String},
        avgEntry:{type: Int16Array},
        stop:{type: Int16Array},
        targetExit:{type: Int16Array},
        size:{type: Int16Array},
        walletBalance:{type: Int16Array},
        accRisk:{type: Int16Array},
        confidence:{type: Int16Array},
        plannedRisk:{type: Int16Array},
        finalRisk:{type: Int16Array},
        isOpen:{type: Boolean, default: true},
        tags:{type: String},
        thread:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thread",
            }
        ]
    }
);

const Trade = mongoose.model("Trade", tradeModel);

module.exports = Trade;