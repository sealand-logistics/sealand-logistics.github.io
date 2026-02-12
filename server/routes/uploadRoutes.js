const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();
const { protect } = require('../utils/authMiddleware');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Storage
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
        console.log('Upload failed: No file provided');
        return res.status(400).send({ message: 'No file uploaded' });
    }

    try {
        console.log('Upload successful:', req.file.path);
        res.send({
            url: req.file.path
        });
    } catch (error) {
        console.error('Upload handler error:', error);
        res.status(500).send({ message: 'Internal server error during upload' });
    }
});

module.exports = router;
