import express from 'express';
import { uploadImage, uploadDocument, uploadVideo } from '../middleware/upload.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadLimiter } from '../middleware/rateLimit.js';
import path from 'path';
import fs from 'fs';

const uploadRoute = express.Router();

// Upload images
uploadRoute.post('/images', authenticateToken, uploadLimiter, uploadImage, (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const fileUrls = req.files.images.map(file => ({
      url: `/uploads/images/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      message: 'Images uploaded successfully',
      files: fileUrls
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Upload documents
uploadRoute.post('/documents', authenticateToken, uploadLimiter, uploadDocument, (req, res) => {
  try {
    if (!req.files || !req.files.documents) {
      return res.status(400).json({ message: 'No documents uploaded' });
    }

    const fileUrls = req.files.documents.map(file => ({
      url: `/uploads/documents/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      message: 'Documents uploaded successfully',
      files: fileUrls
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Serve uploaded files
uploadRoute.get('/files/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const filePath = path.join(process.cwd(), 'uploads', type, filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

export default uploadRoute;