const express = require('express');
const { registerUser, login, logout, preRegisteration, verifyCode, changepassword, passResetRegisteration } = require('../controllers/authController');
const { registrationLimiter, loginLimiter, verifyEmailLimiter } = require('../utilities/ratelimits');
const router = express.Router();

router.post('/register', registrationLimiter, registerUser);
router.post('/login',loginLimiter, login);
router.post('/verification',registrationLimiter, preRegisteration);
router.post('/passwordResetverification',registrationLimiter, passResetRegisteration);
router.post('/verifyCode', verifyEmailLimiter, verifyCode);
router.post('/changepassword', loginLimiter, changepassword)
router.post('/logout', logout);

module.exports = router;