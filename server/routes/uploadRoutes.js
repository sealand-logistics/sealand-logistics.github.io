const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { protect } = require('../utils/authMiddleware');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Disk Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Helper to get full URL/path
const getFileUrl = (req, filename) => {
    // Return relative path which Nginx will handle
    return `/uploads/${filename}`;
};

// Single Upload
router.post('/', protect, (req, res) => {
    console.log('LOCAL UPLOAD: Start processed');
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('MULTER ERROR:', err);
            return res.status(500).json({ message: 'Upload failed', error: err.message });
        }
        if (!req.file) {
            console.log('UPLOAD: No file provided');
            return res.status(400).json({ message: 'No file provided' });
        }

        const url = getFileUrl(req, req.file.filename);
        console.log('UPLOAD: Success!', url);
        res.json({ url });
    });
});

// Multiple Uploads
router.post('/multiple', protect, (req, res) => {
    console.log('LOCAL UPLOAD MULTIPLE: Start processed');
    upload.array('images', 50)(req, res, (err) => {
        if (err) {
            console.error('MULTER ERROR:', err);
            return res.status(500).json({ message: 'Upload failed', error: err.message });
        }
        if (!req.files || req.files.length === 0) {
            console.log('UPLOAD: No files provided');
            return res.status(400).json({ message: 'No files provided' });
        }

        const urls = req.files.map(file => getFileUrl(req, file.filename));
        console.log('UPLOAD MULTIPLE: Success!', urls.length, 'files');
        res.json({ urls });
    });
});

module.exports = router;
