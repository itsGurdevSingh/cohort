const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    password:String,
    info:String
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;