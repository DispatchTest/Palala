const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  //All files may not be jpg
  filename(req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}` + path.extname(file.originalname));
  },
});

const upload = multer({
  limits: {
    fieldSize: 1024 * 512,
    fieldNameSize: 200,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      //Return JSON Response for error 
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  storage: storage,
});

//Add File size limits and File type Strict
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    path: `/${req.file.path}`,
  });
});

//Add Error Handling
router.post("/path", upload.single("file"), async (req, res) => {
  await unlinkAsync(`.` + req.body.path);
  res.json({
    success: true,
    message: "file deleted",
  });
});

module.exports = router;
