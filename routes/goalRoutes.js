const express = require('express');
const router = express.Router();
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../contrallers/goalController');
const protect = require('../middleware/authMiddleware'); // Import the protect middleware

// Use the protect middleware to secure the routes
router.get('/', protect, getGoals);    // This will now require a valid token
router.post('/', protect, setGoals);   // This will now require a valid token
router.put('/:id', protect, updateGoals);   // This will now require a valid token
router.delete('/:id', protect, deleteGoals);  // This will now require a valid token

module.exports = router;
