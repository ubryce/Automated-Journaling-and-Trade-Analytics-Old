const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const Tag = require("../models/tagModel");

// TODO create fetch tags
const fetchTags = asyncHandler( async (req, res) => {
    try {
        // TODO fix request
        const tags = await Tag.find({$eq: req.user._id})
            .populate("tag")
            .then( async (results) => {
                results = await User.populate(results, {
                    path: "latestTrade.user",
                    select: "name email"
                });
                res.status(200).send(results);
            });

        res.json(tags);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createTag = asyncHandler( async (req, res) => {
    const tagData = {
        tag: req.body.tag,
        tagType: req.body.tagType,
        user: req.user
    };

    try {
        // TODO check if tag already exists
        const createdTag = await Tag.create(tagData);
        const fullTag = await Tag.findOne({_id: createdTag._id})
            .populate("user", "-password");

        res.status(200).json(fullTag);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// TODO deletetag function
const deleteTag = asyncHandler( async (req, res) => {
    try {

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


module.exports = { fetchTags, createTag, deleteTag };