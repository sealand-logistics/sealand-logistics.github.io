const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const username = 'admin';
        const password = 'adminpassword123';

        const user = await User.findOne({ username });
        if (user) {
            user.password = password;
            await user.save();
            console.log('Admin password reset successfully!');
        } else {
            await User.create({ username, password });
            console.log('Admin account created successfully!');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

resetAdmin();
