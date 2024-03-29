const uploads=require('../models/blogSchema')
const user=require('../models/userSchema')
const multer=require('multer');
const { S3Client , PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv=require('dotenv');
const crypto=require('crypto');

dotenv.config()

const randomImageName= (bytes=32)=> crypto.randomBytes(bytes).toString('hex');
const bucketName=process.env.BUCKET_NAME
const bucketRegion=process.env.BUCKET_REGION
const accessKey=process.env.ACCESS_KEY
const secretAccesskey=process.env.SECRET_ACCESS_KEY

const s3= new S3Client({
  region: bucketRegion,
  credentials:{
    accessKeyId:accessKey,
    secretAccessKey: secretAccesskey,
  }})

async function uploadController(req, res) {
    try {
        //console.log("hello")
        console.log("req.file: ",req.file)
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const imageName = randomImageName();
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
        const imageUrl = `https://s3-${bucketRegion}.amazonaws.com/${params.Bucket}/${params.Key}`;
        
        const user_email = await user.findOne({"email":req.user.email});
        console.log(user_email)
        const up= await uploads.create({
            text: req.body.text,
            imageUrl: imageUrl,
            user: user_email._id
       })
       await up.save();
       console.log(up)
       const User=await user.findById(user_email._id)
       if (!User.blogs.includes(up)){
          User.blogs.push(up)
       }
       await User.save();
       return res.status(201).send(imageUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error.');
    }
}

async function getController(req,res){
  try{
    const dataAll = await uploads.find().populate("user")   
    if(dataAll.length==0){
        return res.status(404).json({
        message: "No data found",
      })
    }
    else {
      return res.status(201).json(dataAll);
    }
  }
  catch(err){
    console.error(err);
    return res.status(500).send(err);
  }
}
module.exports={
   uploadController,
   getController
};