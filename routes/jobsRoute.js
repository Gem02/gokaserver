const express = require('express');
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();
const {createJob, getJobs, applyJob} = require('../controllers/jobController')

router.post('/createJob', verifyToken, createJob);
router.get('/alljobs', verifyToken, getJobs);

module.exports = router;
