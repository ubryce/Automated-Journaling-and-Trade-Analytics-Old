const mongoose = require('mongoose');

const tradeModel = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:"User"
        },
        journal:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:"Journal"
        },
        openDate:{type: Date},
        closeDate:{type: Date},
        side:{type: String},
        exchange:{type: String},
        symbol:{type: String},
        avgEntry:{type: Number},
        stop:{type: Number},
        targetExit:{type: Number},
        size:{type: Number},
        walletBalance:{type: Number},
        accRisk:{type: Number},
        confidence:{type: Number},
        plannedRisk:{type: Number},
        finalRisk:{type: Number},
        isOpen:{type: Boolean, default: true},
        tags:[
            {type: String},
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