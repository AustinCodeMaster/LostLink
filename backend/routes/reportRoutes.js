const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Public route
router.post('/', reportController.reportLostItem);

module.exports = router;
