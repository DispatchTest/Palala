const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const genString = require('../utils/RandomString');
const mail = require('../utils/mailer');

exports.getUsers = async(req,res,next)=>{
    const users = await User.find();
    res.json({
      success:true,
      count:users.length,
      data:users
    })
}

exports.register= async (req, res, next) => {
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
        console.log(errors);
      } else {
        const newUser = new User(req.body);

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            //Save user
            newUser
              .save()
              .then((user) => {
                const {email,role} = user;
                mail(user.email,"User Verification code", `Your user verification code is ${genString(5)}`);
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
};

exports.login= async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

exports.logOut = async (req, res, next) => {
  req.logout();
  res.redirect("/");
};

