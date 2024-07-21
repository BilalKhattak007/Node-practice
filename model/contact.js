const mongoose = require("mongoose")

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Please add contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add contact email"]
    },
    phone:{
        type:String,
        required:[true,"Please add contact number"]
    },
    Timestamp:{
        type:Date,
        default:Date.now()
    }
})

const contactModel = mongoose.model("Contact",contactSchema)
module.exports=contactModel;