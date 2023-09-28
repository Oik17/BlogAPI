const uploads=require('../models/blogSchema')
const multer=require('multer');
//import multer from 'multer'

const storage = multer.memoryStorage()
const uploadImage = multer({ storage: storage })

async function uploadController(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      // Assuming you want to save the uploaded file to the 'uploads' collection
      const uploadedFile = new uploads({
        data: req.file.buffer, // Assuming you want to store the file data
        // Other properties you want to save with the file
      });
  
      await uploadedFile.save();
  
      return res.status(201).send('File uploaded successfully.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error.');
    }
  }
module.exports={
   uploadController
};