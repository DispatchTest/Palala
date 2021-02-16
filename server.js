const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const connectDB = require("./config/dbconfig");
const cors = require('cors'); 
const path = require('path');

const app = express();
app.use(cors());

dotenv.config({
  path:'./config/config.env'
});


//Route files
const users = require('./routes/User');
const products = require('./routes/Product');
const uploads = require('./routes/Upload');
const slide = require('./routes/Slide');
const transactions = require('./routes/Transaction');
const upcloud = require('./routes/Cloudinary');


require("./config/passport")(passport);

connectDB();

app.use(express.urlencoded({extended:false}));

app.use(morgan('dev'));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );

//Init Passport
app.use(passport.initialize());
app.use(passport.session());



//Mount All Routers
app.use('/api/v1/users',users);

app.use('/api/v1/products',products);

app.use('/api/v1/trans',transactions);

//Route to upload Or Delete Files
app.use('/api/v1/uploads',uploads);

//Route to Upload Banners
app.use('/api/v1/slide',slide);

//Route to access uploaded files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//Route to upload to cloudinary
app.use('/api/v1/cloud',upcloud);

const PORT = process.env.PORT || 5100;
const server = app.listen(PORT,console.log(`Server running on Port:${PORT.bgGreen}`.bgCyan.black));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`${err}`.black.bgRed);
});
