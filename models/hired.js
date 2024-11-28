const mongoose = require('mongoose');

const hiredSchema = new mongoose.Schema({
    employerId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Users', require: true},
    workerId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Users', require: true},
    jobId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Job'},
    hireReqId: {type: mongoose.SchemaTypes.ObjectId, ref: 'HireRequest'},
    status: {type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending'}
});

const hiredModel = mongoose.model('Hired', hiredSchema);
module.exports = hiredModel;