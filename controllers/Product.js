const Product = require("../models/Product");
const ErrorResponse = require('../utils/errorResponse');

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();

  if (products.length === 0) {
    res.json({
      success: true,
      item:products,
      message: `No data found`,
    });
  } else {
    res.status(200).json({
      success: true,
      count: products.length,
      item: products,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success:false,
      message:new ErrorResponse(`Product with id of ${req.params.id} not found.`)
    })
  } else {
    res.status(200).json({
      success: true,
      data: product,
    });
  }
};

exports.createProduct = async (req, res, next) => {
 
      const product = await Product.create(req.body);

      if (!product) {
        res.status(400).json({
          success:false,
          message:new ErrorResponse(`Product not created.`)
        })
      } else {
        res.status(201).json({
          success: true,
          data: product,
        });
      }
    }


exports.updateProduct =  async(req, res, next) => {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (products.length === 0) {
        res.status(404).json({
          success:false,
          message:new ErrorResponse(`Product with id of ${req.params.id} not found.`)
        });
      } else {
        res.json({
          success: true,
          data: product,
        });
      }
    }


exports.deleteProduct =  async(req, res, next) => {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        res.status(404).json({
          success:false,
          message:new ErrorResponse(`Product with id of ${req.params.id} not found.`)
        })
      } else {
        res.json({
          success: true,
          data: [],
        });
      }
    }


exports.search=async(req,res,next)=>{
    const query = new RegExp(req.params.query,'i');
    const data = await Product.find({name:query});
  
      res.json({
        success:true,
        data:data
      })
}


exports.filter=async(req,res,next)=>{
  const query = new RegExp(req.params.query,'i');
  const data = await Product.find({category:query});

    res.json({
      success:true,
      data:data
    })
}