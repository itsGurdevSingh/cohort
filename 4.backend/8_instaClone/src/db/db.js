const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const connectToDb = ()=>{
        mongoose.connect(uri)
        .then(()=>console.log('connected to db'))
        .catch(err=> console.log('failed to connecting to db', err.message))
}

module.exports = connectToDb;
