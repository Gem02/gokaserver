const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    directoryId: {type: String, require: true},
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    message: {type: String, require: true},
    head: {type: String, require: true},
    purpose: {type:String},
    viewed: {type: Boolean, default: false},
    createdAt:{type: Date, default: Date.now}
});

const notificationModel = mongoose.model('notification', notificationSchema);
module.exports = notificationModel;