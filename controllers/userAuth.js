const bcrypt=require('bcrypt');
const user=require("../models/userSchema");

async function signup(req,res){
    try{
        console.log("hello")
        const user_exists = await user.findOne({"email":req.body.email});
        console.log(user_exists)
        if (user_exists) {
            
            return res.status(400).json({error: "User already exists"});
        }
        
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const newUser=await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        newUser.save()
        res.status(201).send("User created\n"+newUser)
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports={
    signup
}