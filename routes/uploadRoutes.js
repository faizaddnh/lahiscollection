const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

dotenv.config();
const uploadRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Storage = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".mp4" && ext !== ".mkv" && ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});


uploadRouter.post('/', Storage.single('file'), (req, res) => {
  cloudinary.uploader.upload(req.file.path,
    {
      resource_type: "video",
      folder: "lahima",
    },

    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send(result);
    });
});


uploadRouter.post('/image', Storage.single('file'), (req, res) => {
  cloudinary.uploader.upload(req.file.path,
    {
      resource_type: "image",
      folder: "lahima",
    },

    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).send(result);
    });
});



module.exports = uploadRouter;
