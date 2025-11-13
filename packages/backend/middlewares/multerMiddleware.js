import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { ValidationError } from '../errors/tiendaSolError.js';

const uploadRoot = path.resolve(process.cwd(), 'public', 'fotosProductos');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(uploadRoot)) {
        fs.mkdirSync(uploadRoot, { recursive: true });
      }
      cb(null, uploadRoot);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${uniqueSuffix}-${safeOriginal}`);
  },
});

function imageFileFilter(req, file, cb) {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ValidationError('Solo se permiten imágenes'));
  }
}

export const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.UPLOAD_MAX_SIZE || '5242880', 10),
    files: parseInt(process.env.UPLOAD_MAX_FILES || '10', 10),
  },
  fileFilter: imageFileFilter,
});
