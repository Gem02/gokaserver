const express = require('express');
const { registerUser, login, logout, preRegisteration, verifyCode } = require('../controllers/authController');
const { registrationLimiter, loginLimiter, verifyEmailLimiter } = require('../utilities/ratelimits');
const router = express.Router();

router.post('/register', registrationLimiter, registerUser);
router.post('/login',loginLimiter, login);
router.post('/verification',registrationLimiter, preRegisteration);
router.post('/verifyCode', verifyEmailLimiter, verifyCode);
router.post('/logout', logout);

module.exports = router;