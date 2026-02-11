const mongoose = require('mongoose');
require('dotenv').config();

const Project = mongoose.model('Project', new mongoose.Schema({}));
const Client = mongoose.model('Client', new mongoose.Schema({}));
const Contact = mongoose.model('Contact', new mongoose.Schema({}));

async function checkCounts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const projects = await mongoose.connection.db.collection('projects').countDocuments();
        const clients = await mongoose.connection.db.collection('clients').countDocuments();
        const contacts = await mongoose.connection.db.collection('contacts').countDocuments();

        console.log(`Projects: ${projects}`);
        console.log(`Clients: ${clients}`);
        console.log(`Contacts: ${contacts}`);

        await mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkCounts();
