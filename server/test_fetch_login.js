const test = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'adminpassword123'
            })
        });
        const data = await res.json();
        if (res.ok) {
            console.log('Login successful:', data);
        } else {
            console.error('Login failed:', data);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

test();
