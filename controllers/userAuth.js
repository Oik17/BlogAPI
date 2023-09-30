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
        else{
            
            const hashedPassword=await bcrypt.hash(req.body.password,10);
            const newUser=await user.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            newUser.save()
            res.status(201).send("User created\n"+newUser)
        }
    }
    catch(err){
        res.status(500).send(err)
    }
}

async function login(req,res){
    try{
        const user_exists = await user.findOne({"email":req.body.email});

        if(user_exists==null){
            console.log("why am i here")
            return res.status(400).json({message: "user does not exist"})
        }

        if(await bcrypt.compare(req.body.password,user_exists.password)){
            res.status(201).send("Logging in");
        }
        else{
            res.status(500).send("Incorrect password");
        }
        
    } catch(err){
        res.status(500).send(err);
    }
}

module.exports={
    signup,
    login
}