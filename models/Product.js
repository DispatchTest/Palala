const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter product'],
    },
    image:{
        type:String,
        required:[true,'Kindly upload an image of the Product']
    },
    price:{
        type:Number,
        required:[true,'Please enter the price of the bundle']
      },
    quantityInStock:{
        type:Number,
        required:[true,'Enter the quantity of product'],
        default:1
    },
    description:{
        type:String,
        required:[true,'Enter the Description of the product']
    },
    category:{
        type:String,
    },
    tags:{
        type:[String],
    },
    specifications:{
        type:[String],
        required:[true,'Enter the specifications of the product']
    },
    countryOfOrigin:{
        type:String
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },
    rating:{
        type:Number
    },
    productImages:{
        type:[String],
        required:true
    },

    resourceUrls:{
        type:[String],
        required:[true,'Kindly add the resource URLS']
    },
    createdBy:{
        type:String,
        required:true
    },
    numberOfPurchases:{
        type:Number,
    } 

})


module.exports = mongoose.model("Product",ProductSchema);