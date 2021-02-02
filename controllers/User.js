const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {genString} = require('../utils/RandomString');
const {mail} = require('../utils/mailer');

exports.getUsers = async(req,res,next)=>{
    const users = await User.find();
    res.json({
      success:true,
      count:users.length,
      data:users
    })
}


exports.register= async (req, res, next) => {
  if(Object.keys(req.body).length === 0){
    res.status(400).json({
      success:false,
      message:"Kindly fill all require Fields"
    });
  }
  else{
    const {
      email,
      password,
      password2,
      role
    } = req.body;
    let errors = [];
    if (
      !email ||
      !password ||
      !password2 ||
      !role 
    ) {
      errors.push({ message: "Kindly fill in the required fields" });
      console.log(errors);
    }
  
    if (password.length < 5) {
      errors.push({ message: `Password should be more than 5 characters` });
    }
    if (password !== password2) {
      errors.push({ message: "Passwords do not match" });
    }
  
    if (errors.length > 0) {
      res.json({
        errors,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ message: `Email is already in use.` });
          res.status(400).json({
            success:false,
            message:errors
          })
        } else {
          const newUser = new User(req.body);
  
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              const verStr = genString(5);
              newUser.verStr = verStr;
              mail(email,"User Verification Code",newUser.firstname, `<p style="color:white; font-size:1.2rem">Your user verification code is :</p> <h3 style="color:white; font-size: 3rem;
              margin: 10px 0px;">${verStr} <h3>`);  
              //Save user
              newUser
                .save()
                .then((user) => {
                  const {email,role} = user;
                  res.json({success:true, data:{email,role}});
                  
                })
                .catch((err) => {
                  res.send(err);
                });
            })
          );
        }
      });
    }
  }
};

exports.verifyUser=async(req,res,next)=>{
  const {verStr,email} = req.body;
  User.findOne({email:email}).then(user=>{
    if(user && user.verStr == verStr && user.verified == false){
      user.verified = true;
      user.verStr = null;
      User.findByIdAndUpdate(user.id,user,{
        new: true,
        runValidators: true,
      }).then(user=>{
        res.json({
          success:true,
          data:{email:user.email,role:user.role}
        })
      });
    }
    else{
      res.status(400).json({
        success:false,
        message: "User verification failed"
      })
    }
  })
}

exports.login= async (req, res, next) => {
  if(Object.keys(req.body).length === 0){
    res.status(400).json({
      success:false,
      message:"Kindly fill all require Fields"
    });
  }else{
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
    })(req, res, next);
  }
};

exports.logOut = async (req, res, next) => {
  req.logout();
  res.redirect("/");
};

