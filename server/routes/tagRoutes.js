const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createTag, fetchTags, deleteTag } = require("../controllers/tagControllers")
const router = express.Router();

router.route('/').post(protect, createTag);
router.route('/').get(protect, fetchTags);
router.route('/').delete(protect, deleteTag);

module.exports = router;