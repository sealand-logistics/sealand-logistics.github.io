const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { protect } = require('../utils/authMiddleware');

// Use Absolute Path for VPS stability
const uploadsDir = path.resolve(process.cwd(), 'uploads');
console.log('--- UPLOAD CONFIG ---');
console.log('TARGET DIRECTORY:', uploadsDir);

if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
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
    limits: {
        fileSize: 500 * 1024 * 1024, // 500MB
        fieldSize: 500 * 1024 * 1024
    }
});

// Helper to get full URL/path
const getFileUrl = (req, filename) => {
    return `/uploads/${filename}`;
};

// Single Upload
router.post('/', protect, (req, res) => {
    console.log('SINGLE UPLOAD: Request received');
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('CRITICAL UPLOAD ERROR:', err);
            return res.status(500).json({
                message: 'Upload failed',
                error: err.message,
                code: err.code
            });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }

        const url = getFileUrl(req, req.file.filename);
        console.log('UPLOAD SUCCESS:', url);
        res.json({ url });
    });
});

// Multiple Uploads
router.post('/multiple', protect, (req, res) => {
    console.log('MULTIPLE UPLOAD: Request received');
    upload.array('images', 100)(req, res, (err) => {
        if (err) {
            console.error('CRITICAL MULTIPLE UPLOAD ERROR:', err);
            // Log more details for large file failures
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ message: 'File too large (Max 500MB)' });
            }
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({ message: 'Too many files (Max 100)' });
            }
            return res.status(500).json({
                message: 'Multiple upload failed',
                error: err.message,
                code: err.code
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files selected' });
        }

        const urls = req.files.map(file => getFileUrl(req, file.filename));
        console.log('MULTIPLE UPLOAD SUCCESS:', urls.length, 'files');
        res.json({ urls });
    });
});

module.exports = router;
