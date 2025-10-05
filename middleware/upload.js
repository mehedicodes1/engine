import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = [
    'uploads/images',
    'uploads/documents',
    'uploads/videos',
    'uploads/temp'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/temp';
    
    if (file.mimetype.startsWith('image/')) {
      uploadPath = 'uploads/images';
    } else if (file.mimetype.startsWith('video/')) {
      uploadPath = 'uploads/videos';
    } else if (file.mimetype.includes('pdf') || file.mimetype.includes('document')) {
      uploadPath = 'uploads/documents';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    videos: ['video/mp4', 'video/mkv', 'video/avi', 'video/mov'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  };

  const allAllowed = [...allowedTypes.images, ...allowedTypes.videos, ...allowedTypes.documents];
  
  if (allAllowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 5 // Maximum 5 files
  }
});

// Specific upload middleware for different types
export const uploadImage = upload.fields([{ name: 'images', maxCount: 5 }]);
export const uploadDocument = upload.fields([{ name: 'documents', maxCount: 3 }]);
export const uploadVideo = upload.fields([{ name: 'videos', maxCount: 1 }]);