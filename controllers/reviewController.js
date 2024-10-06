const Review = require('../models/review');

const addReview = async (req, res) => {
    const { workerId, reviewerId, rating, text } = req.body;

    try {
        const newReview = new Review({ workerId, reviewerId, rating, text });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerReviews = async (req, res) => {
    const { workerId } = req.params;

    try {
        const reviews = await Review.find({ workerId }).populate('reviewerId', 'name profileImage');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAverageRating = async (req, res) => {
    const { workerId } = req.params;
  
    try {
      const reviews = await Review.find({ workerId });
      const averageRating = reviews.length
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0;
      res.status(200).json({ averageRating, totalReviews: reviews.length });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { addReview, getWorkerReviews, getAverageRating };
