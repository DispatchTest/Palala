module.exports={

    isAuth: function(req,res, next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.status(401).send(`You are not authorized to access this route`);
        }
    }

}