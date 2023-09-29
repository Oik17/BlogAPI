const express = require('express');
const router = express.Router();
const multer=require('multer');
const { dirname }=require("path");
const { fileURLToPath }=require("url");
// import express from 'express'
// import multer from 'multer'
// import { dirname } from "path";
// import { fileURLToPath } from "url";

//const router = express.Router();
const storage = multer.memoryStorage()
const uploadImage = multer({ storage: storage })
//const xyz = dirname(fileURLToPath(import.meta.url));

const {uploadController,getController}=require('../controllers/upload')
//import uploadController from '../controllers/upload'
// Define routes on the router...
router.get('/test', (req, res) => {
  res.send("hello");
});

//router.post('/uploadFile',uploadImage.single("image"),uploadController)

router.post('/uploadFile', uploadImage.single("image"), async (req, res) => {
    uploadController(req,res);
  });

router.get('/getData', (req,res)=>{
  getController(req,res)
})


module.exports=router;    