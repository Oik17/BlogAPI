const express = require('express');
const router = express.Router();


const {signup,login}=require('../controllers/userAuth')
router.get('/test', (req, res) => {
  res.send("hello");
});

//router.post('/uploadFile',uploadImage.single("image"),uploadController)

router.post('/signup', async (req, res) => {
    signup(req,res);
  });

router.post('/login', async (req,res)=>{
    login(req,res);
})
module.exports=router;    