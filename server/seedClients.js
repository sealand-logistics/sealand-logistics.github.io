const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Client = require('./models/Client');

dotenv.config();

const clientLogos = [
    "image 12.png", "image 12-1.png", "image 12-2.png", "image 12-3.png",
    "image 13.png", "image 13-1.png", "image 13-2.png", "image 13-3.png",
    "image 14.png", "image 14-1.png", "image 14-2.png", "image 14-3.png", "image 14-4.png",
    "image 15.png", "image 15-1.png", "image 15-2.png", "image 15-3.png", "image 15-4.png",
    "image 16.png", "image 16-1.png", "image 16-2.png", "image 16-3.png", "image 16-4.png",
    "image 17.png", "image 17-1.png", "image 17-2.png", "image 17-3.png", "image 17-4.png",
    "image 18.png", "image 19.png"
];

const clients = clientLogos.map((logo, index) => ({
    name: `Client ${index + 1}`,
    logo: `http://localhost:5000/uploads/clients/${logo}`
}));

const seedClients = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Client.insertMany(clients);
        console.log('Clients seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding clients:', err);
        process.exit(1);
    }
};

seedClients();
