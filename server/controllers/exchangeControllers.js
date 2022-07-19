const asyncHandler = require('express-async-handler');
const Exchange = require('../models/exchangeModel');
const { update } = require('../models/userModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createExchange = asyncHandler(async (req, res) => {
    
    // Check if all fields were filled
    if (!req.body.exchangeName || !req.body.exchangeAPI || !req.body.exchangeSecret || !req.body.exchange) {
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
            exchange: req.body.exchange
        });

        const fullExchange = await Exchange.findOne({ _id: exchange._id })
        
        res.status(200).send(fullExchange);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const fetchExchanges = asyncHandler(async (req, res) => {
    try {
        Exchange.find({user: {$eq: req.user._id}}, "-exchangeSecret")
            .sort({updatedAt: -1})
            .then( async (results) => {
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameExchange = asyncHandler(async (req, res) => {
    const { exchangeId, exchangeName, exchangeAPI, exchangeSecret, exchange } = req.body;

    const updatedExchange = await Exchange.findOneAndUpdate(
        {_id: exchangeId, user: req.user._id},
        {
            exchangeName: exchangeName,
            exchangeAPI: exchangeAPI,
            exchangeSecret: exchangeSecret,
            exchange: exchange
        }
    )

    if (!updatedExchange) {
        res.status(404);
        throw new Error("Exchange not found");
    } else {
        res.json(updatedExchange);
    }
});

const deleteExchange = asyncHandler(async (req, res) => {
    const { exchangeId } = req.body;
    
    const updatedExchange = await Exchange.findOneAndDelete(
        {_id: exchangeId, user: req.user._id}
    )

    if (!updatedExchange ) {
        res.status(404);
        throw new Error("Exchange not found");
    } else {
        res.json(updatedExchange);
    }
});

module.exports = { createExchange, fetchExchanges, renameExchange, deleteExchange };