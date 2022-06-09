const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Check if all fields were filled
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter All Fields");
    }

    // Check if an existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password
    });
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});

module.exports = {registerUser};