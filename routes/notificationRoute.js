const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {getNotifications, viewCheck} = require('../controllers/notificationsController');


router.get('/:userId',verifyToken, getNotifications );
router.put('/view/:Id',verifyToken, viewCheck);

module.exports = router