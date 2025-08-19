require('dotenv').config()
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectToDb = ()=>{
    mongoose.connect(uri)
    .then(()=>console.log('connected to db'))
    .catch(err=>console.log('failed to connect db',err.message))
}

module.exports = connectToDb;