const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { accessJournal, fetchJournals, createJournal, renameJournal, deleteJournal, addToJournal, removeFromJournal } = require("../controllers/journalControllers")
const router = express.Router();

router.route('/').post(protect, accessJournal);
router.route('/').get(protect, fetchJournals);
router.route('/').delete(protect, deleteJournal);
router.route('/create').post(protect, createJournal);
router.route('/rename').put(protect, renameJournal);
router.route('/groupremove').put(protect, removeFromJournal);
router.route('/groupadd').put(protect, addToJournal);

module.exports = router;