const asyncHandler = require("express-async-handler");
const Journal = require("../models/journalModel");
const Trade = require('../models/tradeModel');
const User = require('../models/userModel');

const sendTrade = asyncHandler( async (req, res) => {

    // TODO Check if all required inputs are sent with proper data types
    // Remove latest trade
    // if (!thread || !journalId) {
    //     console.log("Invalid data passed into request");
    //     return res.sendStatus(400);
    // }
    console.log(req.body);

    const newTrade = {
        user: req.user._id,
        journal: req.body.journalId,
        openDate: req.body.openDate,
        closeDate: req.body.closeDate,
        side: req.body.side,
        exchange: req.body.exchange,
        symbol: req.body.symbol,
        avgEntry: req.body.avgEntry,
        stop: req.body.stop,
        target: req.body.target,
        exit: req.body.exit,
        size: req.body.size,
        sizeFiat: req.body.sizeFiat,
        walletBalance: req.body.walletBalance,
        accRisk: req.body.accRisk,
        confidence: req.body.confidence,
        plannedRisk: req.body.plannedRisk,
        finalRisk: req.body.finalRisk,
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
            .populate("journal");

        res.json(trades);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { sendTrade, allTrades };