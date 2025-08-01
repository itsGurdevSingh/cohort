const mongoose = require("mongoose");
require("dotenv").config(); 

const uri = process.env.MONGODB_URI;


const connectToDb = () => {
  mongoose.connect(uri)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
    });
};

module.exports = connectToDb;
