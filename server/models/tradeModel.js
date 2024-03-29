const mongoose = require('mongoose');

const tradeModel = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:"User"
        },
        journal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Journal"
        },
        openDate:{type: Date},
        closeDate:{type: Date},
        side:{type: String},
        exchange:{type: String},
        symbol:{type: String},
        avgEntry:{type: Number},
        stop:{type: Number},
        target:{type: Number},
        exit:{type: Number},
        size:{type: Number},
        sizeFiat:{type: Number},
        pnl:{type: Number},
        walletBalance:{type: Number},
        accRisk:{type: Number},
        confidence:{type: Number},
        execution:{type: Number},
        entryRating:{type: Number},
        management:{type: Number},
        exitRating:{type: Number},
        plannedRisk:{type: Number},
        finalRisk:{type: Number},
        isOpen:{type: Boolean, default: true},
        tags:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            },
        ],
        thread:[
            {
                content: {type: String},
                picture: {type: String},
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Trade = mongoose.model("Trade", tradeModel);

module.exports = Trade;