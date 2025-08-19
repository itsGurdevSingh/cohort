const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getRegisterPage = (req, res) => {
    res.render('register')
}

const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const isUserExist = await userModel.findOne({ $or: [{ username }, { email }] });

        if (isUserExist) res.send('user alreay exist')

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)

        res.status(201).cookie('auth', token).send(user)

    } catch (error) {
        console.log(error.message);
        res.send('error in creating user')
    }

}

const getUserLoginPage = (req,res) =>{
    res.render('login')
}
const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: "Identifier and password required" });
        }

        // Check if identifier looks like an email
        const query = identifier.includes('@')
            ? { email: identifier }
            : { username: identifier };

        const user = await userModel.findOne(query);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
        );

        res
            .status(200)
            .cookie("auth", token,)
            .json({ message: "Login successful", user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    getRegisterPage,
    registerUser,
    getUserLoginPage,
    userLogin
}