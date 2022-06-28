const asyncHandler = require('express-async-handler');
const Exchange = require('../models/exchangeModel');
const { update } = require('../models/userModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// TODO
// make sure only user = user owner
const createExchange = asyncHandler(async (req, res) => {
    
    // Check if all fields were filled
    if (!req.body.exchangeName || !req.body.exchangeAPI || !req.body.exchangeSecret) {
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
    const { exchangeId, exchangeName } = req.body;

    const updatedExchange = await Exchange.findByIdAndUpdate(
        exchangeId,
        {
            exchangeName: exchangeName,
        },
        {
            new: true,
        }
    )

    if (!updatedExchange || req.user._id != updatedExchange.user) {
        res.status(404);
        throw new Error("Exchange not found");
    } else {
        res.json(updatedExchange);
    }
});

const renameExchangeAPI = asyncHandler(async (req, res) => {
    const { exchangeId, exchangeAPI } = req.body;

    const updatedExchange = await Exchange.findByIdAndUpdate(
        exchangeId,
        {
            exchangeAPI: exchangeAPI,
        },
        {
            new: true,
        }
    )

    if (!updatedExchange || req.user._id != updatedExchange.user) {
        res.status(404);
        throw new Error("Exchange not found");
    } else {
        res.json(updatedExchange);
    }
});

const renameExchangeSecret = asyncHandler(async (req, res) => {
    const { exchangeId, exchangeSecret } = req.body;

    let newExchangeSecret = exchangeSecret;

    const salt = await bcrypt.genSalt(10);
    newExchangeSecret = await bcrypt.hash(newExchangeSecret, salt);

    const updatedExchange = await Exchange.findByIdAndUpdate(
        exchangeId,
        {
            exchangeSecret: newExchangeSecret,
        },
        {
            new: true,
        }
    )

    if (!updatedExchange || req.user._id != updatedExchange.user) {
        res.status(404);
        throw new Error("Exchange not found");
    } else {
        res.json(updatedExchange);
    }
});

const deleteExchange = asyncHandler(async (req, res) => {
    const { exchangeId } = req.body;
    console.log(exchangeId)
    const updatedExchange = await Exchange.findByIdAndDelete(
        exchangeId
    )

    if (!updatedExchange || req.user._id != updatedExchange.user) {
        res.status(404);
        throw new Error("Exchange not found");
    } else {
        res.json(updatedExchange);
    }
});

module.exports = { createExchange, fetchExchanges, renameExchange, renameExchangeAPI, renameExchangeSecret, deleteExchange };