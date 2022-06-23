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
});

module.exports = { createExchange };