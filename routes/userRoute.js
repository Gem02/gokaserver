const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {userInfo, userProfile, otherUserProfile} = require('../controllers/userController');

router.get('/user', verifyToken, userInfo);
router.get('/profile', verifyToken, userProfile);
router.get('/profile/:userId', verifyToken, otherUserProfile);

module.exports = router;