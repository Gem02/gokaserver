const express = require('express');
const router = express.Router();
const { getWorkerStats} = require('../controllers/statsController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/mystats', verifyToken,  getWorkerStats);

module.exports = router;
