const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {hireRequest} = require('../controllers/hireController');

router.post('/', verifyToken, hireRequest);

module.exports = router;