require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

console.log('userController');

const router = require('./router/index');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    if (!process.env.DB_URL){
      throw new Error('путь к БД не прописан');
    }
    await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
