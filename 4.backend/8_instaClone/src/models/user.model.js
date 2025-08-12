const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio:{ type:String},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
