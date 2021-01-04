const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Add a banner name"]
    },
    path:{
        type:String,
        required:[true,"No path here"],
    },

    timestamp:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Banner",BannerSchema);