const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const username = 'admin';
        const password = 'adminpassword123'; // User should change this later

        const userExists = await User.findOne({ username });
        if (userExists) {
            console.log('Account already exists');
            process.exit();
        }

        const user = await User.create({
            username,
            password
        });

        console.log('Admin account created successfully!');
        console.log('Username: admin');
        console.log('Password: adminpassword123');

        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
