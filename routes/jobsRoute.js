const express = require('express');
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();
const {createJob, getJobs, singleJob, hireRequest, 
    declineJob, applyJob, applicants, acceptJob, employerHire, employerJob, 
    setProgress, completedJob} = require('../controllers/jobController')

router.post('/createJob', verifyToken, createJob);
router.post('/request', verifyToken, hireRequest); //direct hire
router.get('/alljobs', verifyToken, getJobs);
router.get('/getJob/:id', verifyToken, singleJob); //single job info
router.get('/applyJob/:jobId', verifyToken, applyJob);
router.get('/applicants/:id', verifyToken, applicants);
router.get('/accept/:jobId', verifyToken, acceptJob);
router.get('/decline/:jobId', verifyToken, declineJob);
router.get('/progress/:jobId', verifyToken, setProgress);
router.get('/hire', verifyToken, employerHire);
router.get('/myjobs/:userId', verifyToken, employerJob)
router.get('/completed/:jobId', verifyToken, completedJob)

module.exports = router;
