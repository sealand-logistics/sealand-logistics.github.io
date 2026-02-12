const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));

const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

// Middleware
app.use(cors()); // Allow all for local dev, or specify origins
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Static Folders
const uploadsPath = path.join(__dirname, 'uploads');
if (!require('fs').existsSync(uploadsPath)) {
    require('fs').mkdirSync(uploadsPath);
}
app.use('/uploads', express.static(uploadsPath));

// Status route
app.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
