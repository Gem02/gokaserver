const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { addReview, getWorkerReviews, getAverageRating } = require('../controllers/reviewController');
const router = express.Router();

router.post('/addreview', verifyToken, addReview);
router.get('/reviews/:workerId', verifyToken, getWorkerReviews);
router.get('/average/:workerId', verifyToken, getAverageRating);

module.exports = router;
