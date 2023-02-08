const asyncHandler = require("express-async-handler");
const Journal = require("../models/journalModel");
const Trade = require('../models/tradeModel');
const User = require('../models/userModel');

const sendTrade = asyncHandler( async (req, res) => {
    const { thread, journalId } = req.body;

    if (!thread || !journalId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }
    console.log(req.body);

    var newTrade = {
        user: req.user._id,
        journal: journalId,
        thread: thread,
        size: req.body.size
    }

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