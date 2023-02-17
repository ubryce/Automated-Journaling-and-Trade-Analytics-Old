const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const Tag = require("../models/tagModel");

// TODO create functions
const fetchTags = asyncHandler( async (req, res) => {
    try {
        const tags = await Tag.find({journal:req.params.journalId})
            .populate("user", "name email")
            .populate("journal");

        res.json(tags);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createTag = asyncHandler( async (req, res) => {
    try {

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const deleteTag = asyncHandler( async (req, res) => {
    try {

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


module.exports = { fetchTags, createTag, deleteTag };