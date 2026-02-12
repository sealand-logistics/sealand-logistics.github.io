const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();
const { protect } = require('../utils/authMiddleware');

// Masking function for logs
const mask = (str) => str ? `${str.substring(0, 2)}...` : 'MISSING';

// THIS LOG WILL SHOW IN RENDER LOGS
console.log('--- CLOUDINARY DEBUG ---');
console.log('NAME:', mask(process.env.CLOUDINARY_CLOUD_NAME));
console.log('KEY:', mask(process.env.CLOUDINARY_API_KEY));
console.log('SECRET:', mask(process.env.CLOUDINARY_API_SECRET));
console.log('------------------------');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sealand_uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

const upload = multer({ storage });

// Single Upload
router.post('/', protect, (req, res, next) => {
    console.log('UPLOAD: Start processed');
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('MULTER ERROR:', err);
            return res.status(500).json({ message: 'Upload failed', error: err.message });
        }
        if (!req.file) {
            console.log('UPLOAD: No file provided');
            return res.status(400).json({ message: 'No file provided' });
        }
        console.log('UPLOAD: Success!', req.file.path);
        res.json({ url: req.file.path });
    });
});

// Multiple Uploads
router.post('/multiple', protect, (req, res, next) => {
    console.log('UPLOAD MULTIPLE: Start processed');
    upload.array('images', 50)(req, res, (err) => { // Limit to 50 images
        if (err) {
            console.error('MULTER ERROR:', err);
            return res.status(500).json({ message: 'Upload failed', error: err.message });
        }
        if (!req.files || req.files.length === 0) {
            console.log('UPLOAD: No files provided');
            return res.status(400).json({ message: 'No files provided' });
        }
        console.log('UPLOAD MULTIPLE: Success!', req.files.length, 'files');
        const urls = req.files.map(file => file.path);
        res.json({ urls });
    });
});

module.exports = router;
