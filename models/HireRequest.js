const mongoose = require('mongoose');

const hireRequestSchema = new mongoose.Schema({
  employerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', require:true},
  workerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true},  
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  secondPhoneNumber: {
    type: String,
    trim: true,
    default: null
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  specialRequest: {
    type: String,
    trim: true,
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const HireRequest = mongoose.model('HireRequest', hireRequestSchema);

module.exports = HireRequest;
