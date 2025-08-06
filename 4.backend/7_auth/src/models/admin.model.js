const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name:String,
    msg:{type:String , default:"this is admin"}
})

const adminModel = mongoose.model('admins',adminSchema)

module.exports = adminModel;