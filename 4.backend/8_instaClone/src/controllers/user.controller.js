const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const { username, age, info, password } = req.body;

        const isUser = await userModel.findOne({ username });
        if (isUser) return res.status(400).send("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            age,
            info,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

        res
            .status(201)
            .cookie("auth", token, { httpOnly: true })
            .send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

const getUserProfile = async (req, res) => {
    try {
        const token = req.cookies.auth;
        if (!token) return res.status(401).send("Not authenticated");

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.id);

        if (!user) return res.status(404).send("User not found");

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to get user");
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });
        if (!user) return res.status(400).send("Invalid username or password");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            return res.status(400).send("Invalid username or password");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

        res.cookie("auth", token, { httpOnly: true }).send("Login successful");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};


module.exports ={
    registerUser,
    getUserProfile,
    loginUser
}