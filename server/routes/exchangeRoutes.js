const express = require('express');
const { protect } = require('../middleware/authMiddleware');
//const { accessJournal, fetchJournals, createGroupJournal, renameJournal, addToJournal, removeFromJournal } = require("../controllers/journalControllers")
const { createExchange, fetchExchanges, renameExchange, renameExchangeAPI, renameExchangeSecret, deleteExchange } = require("../controllers/exchangeControllers")
const router = express.Router();

router.route('/').post(protect, createExchange);
router.route('/').get(protect, fetchExchanges);
router.route('/rename').put(protect, renameExchange);
router.route('/apikey').put(protect, renameExchangeAPI);
router.route('/secret').put(protect, renameExchangeSecret);
router.route('/').delete(protect, deleteExchange);

module.exports = router;