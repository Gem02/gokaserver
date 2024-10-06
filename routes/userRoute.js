const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {userInfo, userProfile, otherUserProfile, checkToken, updateInfo, changepassword} = require('../controllers/userController');

router.get('/user', verifyToken, userInfo);
router.get('/checkToken', verifyToken, checkToken);
router.get('/profile', verifyToken, userProfile);
router.get('/profile/:userId', verifyToken, otherUserProfile);
router.put('/updateInfo', verifyToken, updateInfo);
router.put('/changepassword', verifyToken, changepassword);

module.exports = router;