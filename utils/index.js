const multer = require("multer");
const path = require("path");
const videoStorage = multer.diskStorage({
  // Destination to store image
  destination: "videos",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    cb(undefined, true);
  },
});
