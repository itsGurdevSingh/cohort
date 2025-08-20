const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')

const isUserLogedIn = async(req,res,next)=>{
    const token = req.cookies?.auth

    if(!token)  res.redirect('/auth/login')

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    
    const user = userModel.findById(decoded.id)

    if(!user) res.redirect('/auth/register')
    
    req.userId = user._id;

    next()

}

module.exports = isUserLogedIn;