const express = require('express');
const { protect } = require('../middleware/authMiddleware');
//const { accessJournal, fetchJournals, createGroupJournal, renameJournal, addToJournal, removeFromJournal } = require("../controllers/journalControllers")
const { createExchange, fetchExchanges, renameExchange, renameExchangeAPI, renameExchangeSecret } = require("../controllers/exchangeControllers")
const router = express.Router();

// router.route('/').post(protect, accessJournal);
// router.route('/').get(protect, fetchJournals);
// router.route('/group').post(protect, createGroupJournal);
// router.route('/rename').put(protect, renameJournal);
// router.route('/groupremove').put(protect, removeFromJournal);
// router.route('/groupadd').put(protect, addToJournal);

router.route('/').post(protect, createExchange);
router.route('/').get(protect, fetchExchanges);
router.route('/rename').put(protect, renameExchange);
router.route('/apikey').put(protect, renameExchangeAPI);
router.route('/secret').put(protect, renameExchangeSecret);

module.exports = router;