const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
         required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String
    },
})

module.exports=mongoose.model("user",userSchema)