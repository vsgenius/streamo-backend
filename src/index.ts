import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors = require('cors');
import cookieParser = require('cookie-parser');
import mongoose = require('mongoose');
const router = require('./router/index');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);


const start = async () => {
  try {
    if (!process.env.DB_URL){
      throw new Error(`путь к БД не прописан`)
    }
    await mongoose.connect(process.env.DB_URL,{dbName:process.env.DB_NAME});
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
