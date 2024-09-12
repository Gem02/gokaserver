const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    payRate: { type: Number, required: true },
    requiredSkills: [String],
    createdAt: { type: Date, default: Date.now },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // Reference to User model
});

module.exports = mongoose.model('Job', jobSchema);