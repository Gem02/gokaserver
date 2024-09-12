const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    businessName: {type: String, trim: true},
    email: {type: String, required: true, unique: true},
    specialization: {type: String, trim: true},
    password: {type: String, required: true},
    phone: { type: String, required: true },
    role: { type: String, enum: ['artisan', 'employer'], required: true },
    state: {type: String, required: true},
    lga: {type: String, required: true},
    area: {type: String, required: true},
    description: {type: String, trim: true},
    profileImage: {type: String, trim: true},
    isVerified: { type: Boolean, default: false },
    upgraded: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;