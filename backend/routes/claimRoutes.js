const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const auth = require('../middleware/authMiddleware');

// Public route
router.post('/', claimController.claimItem);

// Admin-only 
router.get('/', auth, claimController.getAllClaims);
router.put('/:id', auth, claimController.updateClaimStatus);

module.exports = router;
