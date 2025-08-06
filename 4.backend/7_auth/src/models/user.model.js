const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    msg:{type:String , default:"this is normal user"}
})

const userModel = mongoose.model('Users',userSchema)

module.exports = userModel;