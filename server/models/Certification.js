const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'certifications' });

module.exports = mongoose.model('Certification', certificationSchema);
