const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',  // Reference to the client posting the job
    required: true,
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',  // Reference to users who apply for the job
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const jobModal = mongoose.model('Job', jobSchema);
module.exports = jobModal;
