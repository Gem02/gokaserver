const express = require('express');
const router = express.Router();
const {getWorkersByLocation} = require('../controllers/workersController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/workers', verifyToken, getWorkersByLocation );

module.exports = router;