const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();
const { protect } = require('../utils/authMiddleware');

// Debugging: Verify Env Variables (won't log the full secret for safety)
console.log('Cloudinary Config Check:', {
    name: process.env.CLOUDINARY_CLOUD_NAME ? 'Loaded' : 'MISSING',
    key: process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'MISSING',
    secret: process.env.CLOUDINARY_API_SECRET ? 'Loaded' : 'MISSING'
});

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
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/', protect, (req, res) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer Error:', err);
            return res.status(400).json({ message: `Multer error: ${err.message}` });
        } else if (err) {
            console.error('Cloudinary/Upload Error:', err);
            return res.status(500).json({ message: `Upload error: ${err.message || 'Unknown error'}` });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }

        console.log('Successfully uploaded to Cloudinary:', req.file.path);
        res.json({ url: req.file.path });
    });
});

module.exports = router;
