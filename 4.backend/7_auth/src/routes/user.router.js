const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
require("dotenv").config();

router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    const user = await userModel.create({ name });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie('auth', token).status(201).json({ user, token });

  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({ msg: "No auth token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
});

module.exports = router;
