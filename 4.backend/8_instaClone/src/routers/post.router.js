const router = require("express").Router();
const multer = require("multer");
const isLoggedIn = require("../middlewares/auth.middleware");
const { createPost, getPosts } = require("../controllers/post.controller");

const upload = multer({ storage: multer.memoryStorage() });

// POST route
router.post("/", upload.single("post"), isLoggedIn, createPost);

// GET route
router.get("/", getPosts);

module.exports = router;
