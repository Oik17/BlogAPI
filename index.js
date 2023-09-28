const express=require('express');
const dotenv=require('dotenv');
const uploadRoute=require('./routes/uploadRoute');
const cors=require('cors');

// import express from 'express'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import uploadRoute from './routes/uploadRoute'

dotenv.config()

const app=express();
const port=process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/upload/",uploadRoute)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });