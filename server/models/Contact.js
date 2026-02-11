const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'contacts' });

module.exports = mongoose.model('Contact', contactSchema);
