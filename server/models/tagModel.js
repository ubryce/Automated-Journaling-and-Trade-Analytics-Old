const mongoose = require('mongoose');

const tagModel = mongoose.Schema(
    {
        users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        tag: {type: String},
        tagType: {type: String, enum: ["setup", "mistake"]}
    }
);

const Tag = mongoose.model("Tag", tagModel);

module.exports = Tag;