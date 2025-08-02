const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name:String,
    artist:String,
    audio:String,
    catagory:String
});

const songModel = mongoose.model('songs',songSchema);

module.exports = songModel;