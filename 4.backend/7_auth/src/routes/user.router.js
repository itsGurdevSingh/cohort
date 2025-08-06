const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
require("dotenv").config();

router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    // 1. Create user and wait for it to be saved to DB
    const user = await userModel.create({ name });

    // 2. Sign a token using the user ID (must wrap in an object)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    // 3. Return both user and token properly
    // res
    res.cookie('auth', token).status(201).json({ user, token });

  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
