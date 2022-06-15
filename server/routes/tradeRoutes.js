const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { sendTrade } = require('../controllers/tradeControllers')

const router = express.Router();

router.route('/').post(protect, sendTrade);
//router.route('/:journalId').get(protect, allTrades);

module.exports = router;