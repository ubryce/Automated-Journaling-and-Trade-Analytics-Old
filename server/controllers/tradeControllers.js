const asyncHandler = require("express-async-handler");
const Journal = require("../models/journalModel");
const Trade = require('../models/tradeModel');
const User = require('../models/userModel');

// TODO Check if all required inputs are sent with proper data types
const updateOrCreateTrade = asyncHandler(async (req, res) => {
    const tradeId = req.params.tradeId;

    const tradeData = {
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
        pnl: parseInt(req.body.pnl),
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
    console.log(tradeData);

    try {
        let trade;

        if (tradeId) {
            trade = await Trade.findById(tradeId);

            if (!trade) {
                res.status(404);
                throw new Error("Trade not found");
            }

            // Update trade fields with tradeData
            Object.assign(trade, tradeData);

            // Save the updated trade
            await trade.save();

        } else {
            trade = await Trade.create(tradeData);
        }

        trade = await trade.populate("user", "name");
        trade = await trade.populate("journal");
        // trade = await User.populate(trade, {
        //     path: "journal.users",
        //     select: "name email",
        // });
        //
        // if (!tradeId) {
        //     await Journal.findByIdAndUpdate(req.body.journalId, {
        //         latestTrade: trade,
        //     });
        // }

        res.json(trade);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const allTrades = asyncHandler(async (req, res) => {
    try {
        const journal = await Journal.findById(req.params.journalId);

        // Check if the journal exists
        if (!journal) {
            res.status(404);
            throw new Error("Journal not found");
        }

        // Check if the user making the request owns the journal
        if (req.user._id.toString() !== journal.journalAdmin.toString()) {
            res.status(403);
            throw new Error("You do not have permission to access this journal");
        }

        const trades = await Trade.find({ journal: req.params.journalId })
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

module.exports = { sendTrade, updateOrCreateTrade, allTrades, accessTrade };