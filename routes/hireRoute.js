const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {hired} = require('../controllers/hireController');


router.post('/hired', verifyToken, hired);

module.exports = router;