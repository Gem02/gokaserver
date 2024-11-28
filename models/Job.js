const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  secondPhoneNumber: {
    type: String,
  },
  email: {
    type: String
  },
  tag: {
    type: String,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  specialRequest: {
    type: String
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
  status: {
    type: String,
    enum:['null', 'pending', 'hired', 'accepted', 'inprogress', 'completed'], 
    default: 'null',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobModal = mongoose.model('Job', jobSchema);
module.exports = JobModal;
