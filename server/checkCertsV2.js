const mongoose = require('mongoose');
const Certification = require('./models/Certification');
require('dotenv').config();

const checkCerts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const certs = await Certification.find();
        console.log('Count:', certs.length);
        certs.forEach(c => console.log('- Name:', c.name, '| Image:', c.image.substring(0, 50) + '...'));
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

checkCerts();
