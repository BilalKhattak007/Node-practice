const{constants} = require('../constants')
const { stack } = require("../routes/contactRoutes");
const errorHandle  = (err,req,res,next)=>{
    const statusCode  = res.statusCode ? res.statusCode : 500
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Error",
                message:err.message,
                stackTrace:err.stack
            })
            break;
            case constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized Error",
                message:err.message,
                stackTrace:err.stack
            })
            break;
            case constants.FORBIDDEN:
            res.json({
                title:"Forbidden Error",
                message:err.message,
                stackTrace:err.stack
            })
            break;
            case constants.NOT_FOUND:
                res.json({
                    title:"Not found",
                    message:err.message,
                    stackTrace:err.stack
                })
                default:
                    break;
    }
    next();
}

module.exports=errorHandle