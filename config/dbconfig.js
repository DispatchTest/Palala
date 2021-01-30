const mongoose = require('mongoose');

const connectDB = async()=>{
    const connect = await mongoose.connect(process.env.MONGO_URI_2,
        {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    });

    console.log(`MongoDB connected on Port: ${connect.connection.host}`.bgYellow.black);
}


module.exports = connectDB;