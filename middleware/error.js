const ErrorResponse = require('../utils/errorResponse');
const errorHandler =(err,req,res,next)=>{

    let error = {...err};

    error.message = err.message;
    //Logging error to console
    console.log(err);

    // Mongoose bad objectId
    if(err.name ==='CastError'){
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate key
    if(err.code=== 11000){
        const message ='Duplicate field Entered';
        error = new ErrorResponse(message,400);
    }

    //Mongoose Validation Error
    if(err.name ==='ValidationError'){
        const message = Object.values(err.errors).map(val=>val.message);
        error= new ErrorResponse(message, 400);
    }
   // console.log(err.name);
    res.status(error.statusCode|| 500).json({
        sucess: false,
        error:error.message ||'Server error'
    });
};

module.exports = errorHandler;