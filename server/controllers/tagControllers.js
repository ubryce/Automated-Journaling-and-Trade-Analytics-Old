const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const Tag = require("../models/tagModel");
const Journal = require("../models/journalModel");

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

    const {tags} = req.body;

    try {
        const createdTags = await Tag.insertMany(tags.map(tag => ({
            tag: tag.tag,
            tagType: tag.tagType,
            user: req.user,
        })));

        const fullTags = await Tag.find({ _id: { $in: createdTags.map(tag => tag._id) } })
            .populate("user", "-password");

        res.status(200).json(fullTags);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// TODO make sure no problems here
const deleteTag = asyncHandler( async (req, res) => {
    try {
        const { tagId } = req.body;

        const tagToDelete = await Tag.findOneAndDelete(
            {_id: tagId, user: req.user._id}
        )
        if (!tagToDelete ) {
            res.status(404);
            throw new Error("Tag not found");
        } else {
            res.json(tagToDelete);
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


module.exports = { fetchTags, createTag, deleteTag };