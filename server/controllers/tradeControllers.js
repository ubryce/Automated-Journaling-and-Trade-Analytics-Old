const asyncHandler = require("express-async-handler");
const Journal = require("../models/journalModel");
const Trade = require('../models/tradeModel');
const User = require('../models/userModel');

const sendTrade = asyncHandler( async (req, res) => {

    // TODO Check if all required inputs are sent with proper data types
    // TODO check if trade is closed, if so then calculate the pnl and append it to trade
    // Remove latest trade
    // if (!thread || !journalId) {
    //     console.log("Invalid data passed into request");
    //     return res.sendStatus(400);
    // }

    const newTrade = {
        user: req.user._id,
        journal: req.body.journalId,
        openDate: req.body.openDate,
        closeDate: req.body.closeDate,
        side: req.body.side,
        exchange: req.body.exchange,
        symbol: req.body.symbol,
        avgEntry: parseInt(req.body.avgEntry),
        stop: parseInt(req.body.stop),
        target: parseInt(req.body.target),
        exit: parseInt(req.body.exit),
        size: parseInt(req.body.size),
        sizeFiat: parseInt(req.body.sizeFiat),
        walletBalance: parseInt(req.body.walletBalance),
        accRisk: parseInt(req.body.accRisk),
        confidence: parseInt(req.body.confidence),
        execution: parseInt(req.body.execution),
        entryRating: parseInt(req.body.entryRating),
        management: parseInt(req.body.management),
        exitRating: parseInt(req.body.exitRating),
        plannedRisk: parseInt(req.body.plannedRisk),
        finalRisk: parseInt(req.body.finalRisk),
        isOpen: req.body.isOpen,
        tags: req.body.tags,
        thread: req.body.thread,
    };
    
    console.log(newTrade);

    try {

        var trade = await Trade.create(newTrade);

        trade = await trade.populate("user", "name");
        trade = await trade.populate("journal");
        trade = await User.populate(trade, {
            path: 'journal.users',
            select: "name email"
        });

        await Journal.findByIdAndUpdate(req.body.journalId, {
            latestTrade: trade,
        });
        console.log(trade);

        res.json(trade);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const allTrades = asyncHandler( async (req, res) => {
    try {
        const trades = await Trade.find({journal:req.params.journalId})
            .populate("user", "name email")
            .populate("journal")
            .populate("tags");

        res.json(trades);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const accessTrade = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.tradeId)
        const trade = await Trade.findOne({_id:req.params.tradeId});

        res.status(200).send(trade);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    } 
})

module.exports = { sendTrade, allTrades, accessTrade };