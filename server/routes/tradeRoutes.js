const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { updateOrCreateTrade, allTrades, accessTrade } = require('../controllers/tradeControllers')

const router = express.Router();

router.route('/').post(protect, updateOrCreateTrade);
router.route('/:tradeId').put(protect, updateOrCreateTrade);
router.route('/:journalId').get(protect, allTrades);
router.route('/single/:tradeId').get(protect, accessTrade);

module.exports = router;