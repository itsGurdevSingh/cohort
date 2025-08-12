const router = require("express").Router();
const multer = require("multer");
const uploadToImagekit = require("../service/storage.service");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const isLoggedIn = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('post'), isLoggedIn, async (req, res) => {
    try {
        const image = req.file;
        const { description } = req.body;
        const userId = req.userId;

        if (!image) {
            return res.status(400).send("Image is required");
        }

        const uploadedPost = await uploadToImagekit(image);

        const post = await postModel.create({
            type: 'image',
            post: uploadedPost.url,
            description,  
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
});

router.get('/',async(req,res)=>{

    const posts = await postModel.find()
    res.status(200).json({
        posts:posts
    })
})

module.exports = router;
