const mongoose = require('mongoose');
const Certification = require('./models/Certification');
require('dotenv').config();

const checkCerts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const certs = await Certification.find();
        console.log('Certifications found:', certs.length);
        console.log(JSON.stringify(certs, null, 2));
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

checkCerts();
