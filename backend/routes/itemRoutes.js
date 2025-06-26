const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/authMiddleware');

// Public
router.get('/', itemController.getItems);

// Admin only
router.post('/', auth, itemController.addItem);
router.put('/:id', auth, itemController.updateStatus);
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router;
