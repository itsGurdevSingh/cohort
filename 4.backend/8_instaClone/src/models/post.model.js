const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    type: { type: String, required: true, default: "img" }, 
    post: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
