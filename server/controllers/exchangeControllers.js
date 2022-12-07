const asyncHandler = require('express-async-handler');
const e = require('../models/exchangeModel');

const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption

// Decrypt the text using AES-256-cbc encryption
const decrypt = (exchangeInfoIV, text) => {
    let iv = Buffer.from(exchangeInfoIV, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(e.key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return(decrypted.toString())
}

// Get exchange API keys in order to fetch user data from the exchange
const fetchFromExchange = asyncHandler(async (req, res) => {
    try {
        // Get stored encrypted data form database
        const exchangeInfo = await e.Exchange.findOne({_id: req.body._id, user: req.user._id})
        exchangeSecret = decrypt(exchangeInfo.iv, exchangeInfo.exchangeSecret);
        
        // Checking if decryption was successful 
        console.log(exchangeSecret);
        res.status(200).send("worked");

        // TODO fetch data from exchange using API
        

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createExchange = asyncHandler(async (req, res) => {
    
    // Check if all fields were filled
    if (!req.body.exchangeName || !req.body.exchangeAPI || !req.body.exchangeSecret || !req.body.exchange) {
        res.status(400);
        throw new Error("Please Enter All Fields");
    }

    // Create new exchange
    try {
        const exchange = await e.Exchange.create({
            user: req.user,
            exchangeName: req.body.exchangeName,
            exchangeAPI: req.body.exchangeAPI,
            exchangeSecret: req.body.exchangeSecret,
            exchange: req.body.exchange
        });

        const fullExchange = await e.Exchange.findOne({ _id: exchange._id })
        
        res.status(200).send(fullExchange);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const fetchExchanges = asyncHandler(async (req, res) => {
    try {
        e.Exchange.find({user: {$eq: req.user._id}}, "-exchangeSecret")
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

    const updatedExchange = await e.Exchange.findOneAndUpdate(
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
    
    const updatedExchange = await e.Exchange.findOneAndDelete(
        {_id: exchangeId, user: req.user._id}
    )

    if (!updatedExchange ) {
        res.status(404);
        throw new Error("Exchange not found");
    } else {
        res.json(updatedExchange);
    }
});

module.exports = { fetchFromExchange, createExchange, fetchExchanges, renameExchange, deleteExchange };