const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transID:{
        type:String,
        required:true,
        unique: true,
    },
    userID:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["success","pending","failed"]
    },
    amount:{
        type:Number,
        required:true,
    },
    purchaseDetails:{
        type:[String],
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
    },
    transResolve:{
        type:Date
    }
})

module.exports = mongoose.model("Transaction",TransactionSchema);