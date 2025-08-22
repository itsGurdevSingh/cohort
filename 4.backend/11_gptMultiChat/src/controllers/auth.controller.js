require('dotenv').config();
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req,res) => {

    const {username,firstName,lastName,email,password} = req.body;

    const isUserExist = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserExist) {
        return res.status(400).json({message:'user already exist with credentials'})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({username,fullName:{firstName,lastName},email,password:hashedPassword})

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)

    res.status(201).cookie("authToken",token).json({
        message:'user registered sucessfuly'
    })

}

const loginUser = async(req,res) => {
    const {identifier, password} = req.body;

    if(!identifier,!password){
        console.log("Identifier and password required")
        return res.status(400).json({error:'feilds are not provided'})
    }

    const query = identifier.includes('@')?{email:identifier}:{username:identifier};

    const user = await userModel.findOne({query})

    if (!user){
        console.log('user not found');
        return res.status(400).json({error:'user not found'})
    }

    const isValidPassword = bcrypt.compare(password,user._id)

    if(!isValidPassword){ 
        console.log('Invalid credentials')
        return res.status(400).json({error:'Invalid credentials'})
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.status(200).cookie('authToken',token).json({message:'login sucessfull'})
}


module.exports ={
    registerUser,
    loginUser
}