const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require("path");

const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    filename(req, file, cb) {
        cb(null, `${Date.now()}` + path.extname(file.originalname));
      },
});

const upload = multer({storage:storage});

cloudinary.config({
    cloud_name:"palala",
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

router.post('/upcloud', upload.single('image'), async (req,res)=>{
    const image = req.file.path;
 
    cloudinary.uploader.upload(image).then(data=>{
        res.status(200).json({
            success:true,
            message:"Image Uploaded",
            path:data.secure_url
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Image not uploaded"
        })
    })
});


module.exports = router;