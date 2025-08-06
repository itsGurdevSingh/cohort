const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.MONGODB_URI;

const connectToDb = ()=>{
    mongoose.connect(uri)
    .then(()=>console.log("db is connected"))
    .catch((err)=>console.log("failed to connect to db ", err.message))
}

module.exports = connectToDb;