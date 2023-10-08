// src/middleware/multer.js
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import storage from './gridfsStorage.js';

const router = express.Router();

let gfsInstance;

const getGfs = () => {
  if (!gfsInstance) {
    if (!mongoose.connection || !mongoose.connection.db) {
      return null;
    }
    gfsInstance = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });
  }
  return gfsInstance;
};

const upload = multer({ storage: storage });


router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: `/image/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'File not uploaded' });
  }
});

router.get('/image/:filename', (req, res) => {
  if (!gfs) {
    return res.status(500).json({ error: 'Server is not ready yet. Please try again later.' });
  }

  if (err) {
    return res.status(500).json({ error: err.message });
  }
  if (!file || file.length === 0) {
    return res.status(404).json({ error: 'No file exists' });
  }

  // Check if image
  const file = file[0];
  if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    const readstream = gfs.openDownloadStreamByName(req.params.filename);
    readstream.on('error', err => {
      res.status(500).json({ error: err.message });
    });
    readstream.pipe(res);
  } else {
    res.status(404).json({ error: 'Not an image' });
  }
});

router.get('/all-images', async (req, res) => {
  console.log("Entering /all-images route...");

  // Directly initialize gfs here
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });


  // Check if gfs is initialized
  if (!gfs) {
    console.log("gfs is not defined.");
    return res.status(500).json({ error: 'Server is not initialized properly. gfs is undefined.' });
  }

  // Check if gfs.files is available
  if (!gfs.files) {
    console.log("gfs.files is not defined.");
    return res.status(500).json({ error: 'Server is not initialized properly. gfs.files is undefined.' });
  }

  console.log("gfs and gfs.files are defined. Proceeding...");

  try {
    gfs.files.find({}, { filename: 1 }).limit(10).toArray((err, files) => {
      if (err) {
        console.error("Error fetching files:", err);
        return res.status(500).json({ error: err.message });
      }
      if (!files || files.length === 0) {
        console.log("No files found.");
        return res.status(404).json({
          message: 'No files exist'
        });
      }
      const filenames = files.map(file => file.filename);
      console.log("Files found:", filenames);
      return res.json(filenames);
    });
  } catch (error) {
    console.error("Error in /all-images route:", error.stack);
    res.status(500).send('Server Error');
  }
});

export { upload };
export default router;
