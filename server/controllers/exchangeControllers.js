const asyncHandler = require('express-async-handler');
const Exchange = require('../models/exchangeModel');
const { update } = require('../models/userModel');
const User = require('../models/userModel');

const createExchange = asyncHandler(async (req, res) => {
    
    // Check if all fields were filled
    if (!req.body.exchangeAPI || !req.body.exchangeSecret) {
        res.status(400);
        throw new Error("Please Enter All Fields");
    }

    // Create new exchange
    try {
        const exchange = await Exchange.create({
            user: req.user,
            exchangeName: req.body.exchangeName,
            exchangeAPI: req.body.exchangeAPI,
            exchangeSecret: req.body.exchangeSecret,
        });

        const fullExchange = await Exchange.findOne({ _id: exchange._id })
        
        res.status(200).send(fullExchange);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
    // const { journalId, userId } = req.body;

    // const removed = await Journal.findByIdAndUpdate( journalId, { 
    //     $pull: {users: userId},
    //     },
    //     { new: true, }
    // )
    //     .populate("users", "-password")
    //     .populate("journalAdmin", "-password");

    // if (!removed) {
    //     res.status(404);
    //     throw new Error("Journal not found");
    // } else {
    //     res.json(removed);
    // }
});

module.exports = { createExchange };