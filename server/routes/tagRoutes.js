const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {  } = require("../controllers/journalControllers")
const router = express.Router();

// router.route('/').post(protect, createTag);
// router.route('/').get(protect, fetchTags);
// router.route('/').get(protect, deleteTag);

module.exports = router;