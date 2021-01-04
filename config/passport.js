const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email:email}).then(user=>{
                if(!user){
                    return done(null, false,{message:`Wrong email or password`});
                }

                //decrypt and compare user pass
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    }
                    else{
                        return done(null, false,{message:`Wrong email or password`});
                    }
                })
            }).catch(err=>{
                console.log(err);
            })
        })
    );

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((user,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user);
        })
    })
}