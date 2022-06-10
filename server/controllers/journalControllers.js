const asyncHandler = require('express-async-handler');
const Journal = require('../models/journalModel');
const User = require('../models/userModel');

// Current user sends their user id
const accessJournal = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    // check if userid is sent in request
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    // check if journal is already created with the two users
    var isJournal = await Journal.find({
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ],
    }).populate("users", "-password").populate("latestTrade");

    isJournal = await User.populate(isJournal, {
        path: 'latestTrade.user',
        select: "name email",
    })

    // check if there is existing journal between two users
    if (isJournal.length > 0) {
        // return existing journal
        res.send(isJournal[0]);
    } else {
        // create new journal with both users
        var journalData = {
            journalName: "user",
            users: [req.user._id, userId],
        };

        try {
            const createdJournal = await Journal.create(journalData);
            const FullJournal = await Journal.findOne({_id: createdJournal._id})
                .populate("users", "-password");

            res.status(200).send(FullJournal);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchJournals = asyncHandler(async (req, res) => {
    try {
        Journal.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-password")
            .populate("journalAdmin", "-password")
            .populate("latestTrade")
            .sort({updatedAt: -1})
            .then( async (results) => {
                results = await User.populate(results, {
                    path: "latestTrade.user",
                    select: "name email"
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {accessJournal, fetchJournals};