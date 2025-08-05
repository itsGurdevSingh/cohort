const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_DB_URI;

const connectToDb = ()=>{

  mongoose.connect(uri)
  .then(()=>{
    console.log('connected to db')
  })
  .catch((error)=>{
    console.log("failed to connect to db", error.message)
  });

};

module.exports = connectToDb;