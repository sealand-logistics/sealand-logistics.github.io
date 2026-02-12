const axios = require('axios');

const test = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            username: 'admin',
            password: 'adminpassword123'
        });
        console.log('Login successful:', res.data);
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
    }
};

test();
