const mongoose = require('mongoose');

const applicantsSchema = new mongoose.Schema({
    jobId: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', require: true },
    applicantId: {type: mongoose.Schema.Types.ObjectId, ref: 'Job', require: true }
});

const applicantsModal = mongoose.model('applicants', applicantsSchema);
module.exports = applicantsModal;