const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const {createChat, userChats, findChat} = require('../controllers/chatController');

router.post('/', verifyToken, createChat);
router.get('/:userId', verifyToken, userChats);
router.get('/find/:firstId/:secondId', verifyToken, findChat); 
module.exports = router