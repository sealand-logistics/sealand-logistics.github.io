const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'clients' });

module.exports = mongoose.model('Client', clientSchema);
