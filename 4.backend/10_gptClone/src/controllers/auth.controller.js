const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getRegisterPage = (req, res) => {
    res.render('register')
}

const registerUser = async (req, res) => {

    try {

        console.log(req.body)
        const { username, email, password } = req.body;

        const isUserExist = await userModel.findOne({ $or: [{ username }, { email }] });

        if (isUserExist) {console.log('user alreay exist')
            return res.redirect('/auth/register')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)

        res.status(201).cookie('auth', token).redirect('/')

    } catch (error) {
        console.log('error in creating user',error.message);
        res.redirect('/auth/register')
    }

}

const getUserLoginPage = (req,res) =>{
    res.render('login')
}
const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            console.log("Identifier and password required")
            return res.status(400).redirect('/auth/login');
        }

        // Check if identifier looks like an email
        const query = identifier.includes('@')
            ? { email: identifier }
            : { username: identifier };

        const user = await userModel.findOne(query);

        if (!user) {
            console.log("User not found")
            return res.status(404).redirect('/auth/login');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid credentials")
            return res.status(401).redirect('/auth/login');
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
        );

        res
            .status(200)
            .cookie("auth", token,)
            .redirect('/');

    } catch (error) {
        console.error(error.message);
        res.status(500).redirect('/auth/login');
    }
};


module.exports = {
    getRegisterPage,
    registerUser,
    getUserLoginPage,
    userLogin
}