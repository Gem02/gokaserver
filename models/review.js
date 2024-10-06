const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
