const uploadToImagekit = require("../service/storage.service");
const getCaption = require("../service/genAi.service");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");

const createPost = async (req, res) => {
    try {
        const image = req.file;
        let { caption } = req.body;
        const userId = req.userId;

        if(!caption){ 
            const base64Image = Buffer.from(image.buffer).toString('base64');
            caption = await getCaption(base64Image)
        }


        if (!image) {
            return res.status(400).send("Image is required");
        }

        const uploadedPost = await uploadToImagekit(image);

        const post = await postModel.create({
            type: 'image',
            post: uploadedPost.url,
            caption,
            userId
        });

        await userModel.findByIdAndUpdate(
            userId,
            { $push: { posts: post._id } },
            { new: true }
        );

        res.status(201).send("Post added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong while adding post");
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json({ posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch posts");
    }
};

module.exports = {
    createPost,
    getPosts
}
