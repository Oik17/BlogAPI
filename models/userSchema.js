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
    refreshToken: {
        type: String
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "upload" }],

})

module.exports=mongoose.model("user",userSchema)