const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const username = 'admin';
        const password = 'adminpassword123';

        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            process.exit();
        }

        const isMatch = await user.matchPassword(password);
        console.log('Password match:', isMatch);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

test();
