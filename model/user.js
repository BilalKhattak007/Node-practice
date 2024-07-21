const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"]
    },
    email:{
        type:String,
        required:[true,"Please add the user email"],
        unique:[true,"Email duplication not allowed"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
    },
    Timestamp:{
        type:Date,
        default:Date.now()
    }
})


const userModel =  mongoose.model("User",userSchema)
module.exports = userModel