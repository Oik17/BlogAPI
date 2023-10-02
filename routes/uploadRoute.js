const express = require('express');
const router = express.Router();
const multer=require('multer');

const storage = multer.memoryStorage()
const uploadImage = multer({ storage: storage })

const {uploadController,getController}=require('../controllers/upload')
const {authenticateToken}= require('../middleware/authenticate')

router.post('/test',authenticateToken, (req, res) => {
  res.send("hello");
});


router.post('/uploadFile', uploadImage.single("image"),authenticateToken, async (req, res) => {
    uploadController(req,res);
  });

router.get('/getData', authenticateToken,async (req,res)=>{
  getController(req,res)
})

module.exports=router;    