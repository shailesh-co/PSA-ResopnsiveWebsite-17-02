const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, default: null }, // Optional Field
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
