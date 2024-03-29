const asyncHandler = require('express-async-handler');
const Journal = require('../models/journalModel');
const { update } = require('../models/userModel');
const User = require('../models/userModel');

// TODO allow user to create a journal alone in accessJournal
// make sure only user = user owner

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
// TODO remove latest trade
const fetchJournals = asyncHandler(async (req, res) => {
    try {
        Journal.find({journalAdmin: {$eq: req.user._id}})
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

const createJournal = asyncHandler(async (req, res) => {
    if ( !req.body.name ) {
        return res.status(400).send({messgae: "Please fill Journal name"});
    }

    const journalData = {
        journalName: req.body.name,
        journalDescription: req.body.description,
        journalAdmin: req.user,
    };

    try {
        // TODO check if journal already exists
        const createdJournal = await Journal.create(journalData);
        const fullJournal = await Journal.findOne({ _id: createdJournal._id })
            .populate("journalAdmin", "-password");
        
        res.status(200).json(fullJournal);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameJournal = asyncHandler(async (req, res) => {
    const { journalId, journalName, journalDescription } = req.body;

    console.log("here")
    const updatedJournal = await Journal.findOneAndUpdate(
        {_id: journalId, journalAdmin: req.user._id},
        {journalName: journalName, journalDescription: journalDescription}
    )
    
    if (!updatedJournal) {
        res.status(404);
        throw new Error("Journal not found");
    } else {
        res.json(updatedJournal);
    }
});

const deleteJournal = asyncHandler(async (req, res) => {
    const { journalId } = req.body;
    
    const updatedJournal = await Journal.findOneAndDelete(
        {_id: journalId, user: req.user._id}
    )

    if (!updatedJournal ) {
        res.status(404);
        throw new Error("Journal not found");
    } else {
        res.json(updatedJournal);
    }
})

const addToJournal = asyncHandler(async (req, res) => {
    const { journalId, userId } = req.body;

    const added = await Journal.findByIdAndUpdate( journalId, { 
        $push: {users: userId},
        },
        { new: true, }
    )
        .populate("users", "-password")
        .populate("journalAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Journal not found");
    } else {
        res.json(added);
    }
});

const removeFromJournal = asyncHandler(async (req, res) => {
    const { journalId, userId } = req.body;

    const removed = await Journal.findByIdAndUpdate( journalId, { 
        $pull: {users: userId},
        },
        { new: true, }
    )
        .populate("users", "-password")
        .populate("journalAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Journal not found");
    } else {
        res.json(removed);
    }
});

module.exports = {accessJournal, fetchJournals, createJournal, renameJournal, deleteJournal, addToJournal, removeFromJournal};