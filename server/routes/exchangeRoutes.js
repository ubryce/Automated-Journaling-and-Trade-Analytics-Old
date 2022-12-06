const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { fetchFromExchange, createExchange, fetchExchanges, renameExchange, deleteExchange } = require("../controllers/exchangeControllers")
const router = express.Router();

router.route('/info').get(protect, fetchFromExchange)
router.route('/').post(protect, createExchange);
router.route('/').get(protect, fetchExchanges);
router.route('/rename').put(protect, renameExchange);
router.route('/').delete(protect, deleteExchange);

module.exports = router;