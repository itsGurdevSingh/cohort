require("dotenv").config()
const router = require("express").Router()
const userModel = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


router.post('/register',async(req,res)=>{
    const {username,age,info ,password}=req.body

    const isUser = await userModel.findOne({username})

    if(isUser) res.send("user already exists")

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({username,age,info,password:hashedPassword})

    const token = jwt.sign(id = user.id,process.env.JWT_SECRET_KEY)

    res.cookie("auth",token).send("done").status(201)

})

router.get('/',async(req,res)=>{
    const token = req.cookies.auth

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

    const user = await userModel.findById(decoded)

    res.status(200).send(user)

})

router.post('/login', async(req,res)=>{
    const {username , password} = req.body;

    const user = await userModel.findOne({username})

    if(!user) return res.send(" invalid username or password ...")

    isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch) return res.send("invalid username or password..")

    const token = jwt.sign(id = user.id, process.env.JWT_SECRET_KEY)
    
    res.cookie('auth',token).send('login sucessfuly')
})


module.exports = router;