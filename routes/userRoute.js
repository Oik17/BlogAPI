const express = require('express');
const router = express.Router();


const {signup}=require('../controllers/userAuth')
router.get('/test', (req, res) => {
  res.send("hello");
});

//router.post('/uploadFile',uploadImage.single("image"),uploadController)

router.post('/signup', async (req, res) => {
    signup(req,res);
  });

module.exports=router;    