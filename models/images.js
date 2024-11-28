const mongoose = require('mongoose');

const ImagesSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    albumName: {type: String, required: true},
    albumDesc: {type: String},
    photos: [{
        url: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    thumbnail: {type: String},
    createdAt: {type: Date, default: Date.now}
});

const ImageModel = mongoose.model('images', ImagesSchema);
module.exports = ImageModel;