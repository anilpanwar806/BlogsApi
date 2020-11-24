const User = require('../models/userAuth')
require('dotenv').config
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


//signup
exports.signup=(req,res)=>{
    console.log("req.body",req.body)
const user = new User(req.body);
user.save((err,user)=>{
    if(err){
return res.status(400).json({
    err
})
    }
    res.json({
        user
    })
})
};

//signin
exports.signin = (req,res)=>{    
const{email,password}= req.body
User.findOne({email},(err,user)=>{
    if(err||!user){
        return res.status(400).json({
            error:"User with that email does not exist"
        });
    }

    if(user.isValidPassword(password)==false){
        return res.status(401).json({
            error:"Password doesnot match"
        })
    }
    else{
    const token = jwt.sign({_id: user.id},process.env.jwt)
    res.cookie('t',token,{expire:new Date()+ 9999})
    const {_id,name,email,role}=user;
    return res.json({token,user:{_id,email,name,role}})}
})
};

//signout
exports.signout = (req,res)=>{
    res.clearCookie('t');
    res.json({message:"signout complete"})
};

//require signin user
exports.requireSignin = expressJwt({
    secret:process.env.jwt,
    userProperty:"auth",
    algorithms:['HS256']
    
});

//require Authorised user
exports.isAuth= (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    console.log("hello");
    if(!user){
        return res.status(403).json({
            error:"access denied"
        });
    }
    next();
};

//require Admin
exports.isAdmin = (req,res,next)=>{
    console.log("Admin");
    console.log(req.profile.role);
    if(req.profile.role == 0){
    return res.status(403).json({
        error:"Require admin! Access denied"
    });
 }
next();
}