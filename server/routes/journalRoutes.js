const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { accessJournal, fetchJournals, createGroupJournal } = require("../controllers/journalControllers")
const router = express.Router();

router.route('/').post(protect, accessJournal);
router.route('/').get(protect, fetchJournals);
router.route('/group').post(protect, createGroupJournal);
//router.route('/rename').put(protect, renameJournal);
//router.route('/journalremove').put(protect, removeFromJournal);
//router.route('/journaladd').put(protect, addToJournal);

module.exports = router;