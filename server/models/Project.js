const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // Main/First image (kept for backward compatibility)
    images: [{ type: String }], // Array of all project images
    category: { type: String, enum: ['Specialization', 'OOG', 'Industry'], default: 'Specialization' },
    points: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
}, { collection: 'projects' });

module.exports = mongoose.model('Project', projectSchema);
