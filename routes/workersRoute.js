const express = require('express');
const router = express.Router();
const {getWorkersByLocation, categoryWorker} = require('../controllers/workersController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/workers', verifyToken, getWorkersByLocation );
router.get('/workers/categoryWorker', verifyToken, categoryWorker)

module.exports = router;