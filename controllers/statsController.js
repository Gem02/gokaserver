const JobModal = require('../models/Job');
const Review = require('../models/review');

// Fetch worker stats
const getWorkerStats = async (req, res) => {
  try {
    const workerId = req?.user.id; // Assuming worker's ID is available via authentication middleware
    
    // Aggregate job stats
    const role = req?.user.role;
    if (role === 'artisan') {
        const completedJobs = await JobModal.countDocuments({ workerId, status: 'completed' });
        const activeJobs = await JobModal.countDocuments({ workerId, status: { $in: ['pending', 'hired', 'inprogress'] } });

            // Aggregate review stats
    
        const reviews = await Review.find({ workerId });
        const averageRating = reviews.length
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : 0;
    return res.json({completedJobs, activeJobs, reviews: { totalReviews: reviews.length, averageRating, }, });
    } else if(role === 'employer'){
        const completedJobs = await JobModal.countDocuments({ postedBy:workerId, status: 'completed' });
        const activeJobs = await JobModal.countDocuments({ postedBy:workerId, status: { $in: ['pending', 'hired', 'inprogress'] } });

            // Aggregate review stats
    
        const reviews = await Review.find({ workerId });
        const averageRating = reviews.length
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : 0;
        return res.json({completedJobs, activeJobs, reviews: { totalReviews: reviews.length, averageRating, }, });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching worker stats.' });
  }
};


module.exports = {getWorkerStats};