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

router.post('/', protect, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
    }
    console.log('Upload success! URL:', req.file.path);
    res.json({ url: req.file.path });
});

module.exports = router;
