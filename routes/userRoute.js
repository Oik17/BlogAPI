const express = require('express');
const router = express.Router();


const {signup,login,refresh,logout}=require('../controllers/userAuth')
const {authenticateToken,verifyRefreshToken}= require('../middleware/authenticate')
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

router.post('/refresh', verifyRefreshToken,async(req,res)=>{
    refresh(req,res);
})

router.post('/logout', authenticateToken, async(req,res)=>{
    logout(req,res);
})
module.exports=router;    