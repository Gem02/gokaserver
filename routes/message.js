const express = require('express');
const router = express.Router();
const {addMessage, getMessages, getLastMessage} = require('../controllers/messsageController');

router.post('/', addMessage);
router.get('/:chatId', getMessages)
module.exports = router;