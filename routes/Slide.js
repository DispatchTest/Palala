const express = require("express");
const {isAuth} = require('../config/isAuth');
const router = express.Router();
const Banner = require("../models/Banner");

router.route("/img").post( isAuth,async(req, res,next) => {

            console.log(req.body);
          const data = await Banner.create(req.body);
          res.json({
            success: true,
            data: data,
          });
  
});

router.route("/img/:id").delete( isAuth,async(req, res,next) => {

        console.log(req.body);
        const data = await Banner.findByIdAndDelete(req.params.id);
        res.json({
          success: true,
          message: "Item Deleted",
        });
      
});

router.route("/img").get(async(req, res,next) => {
      const data = await Banner.find();
      res.json({
        success: true,
        data: data,
      });
});

module.exports = router;
