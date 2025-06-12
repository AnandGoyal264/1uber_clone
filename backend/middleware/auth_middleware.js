const userModel=require('../models/user.js')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken');
const Blacklisttoken=require('../models/blacklist_modules.js')
const Captainmodel=require('../models/captain_models.js')
module.exports.authUser=async (req,res,next)=>{
    const authHeader = req.headers.authorization;
let token = null;
console.log(authHeader);
if (req.cookies && req.cookies.token) {
  token = req.cookies.token;
} else if (authHeader && authHeader.startsWith('Bearer ')) {
  token = authHeader.split(' ')[1];
}

//console.log(`token${token}`);

    if (!token){
        return res.status(404).json({message:'unauthorized'})
    }
    const blacklisttoken=await Blacklisttoken.findOne({token:token});
    console.log(blacklisttoken);
    if (blacklisttoken){
        return res.status(404).json({message:'unauthorized'})


    }
    console.log(token);
    try{
        console.log("hi");
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decoded);

        const user=await userModel.findById(decoded._id)
        req.user=user;
     //   console.log(user);
        return next();

    }
    catch (err) {
        console.log(err);
        return res.status(404).json({message:'something wrong'})

    }

}
module.exports.authCaptain=async (req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];
    console.log("token wala part")
    if (!token){
        return res.status(404).json({message:'unauthorized'})
    }
   // console.log(token);
    const blacklisttoken=await Blacklisttoken.findOne({token:token});
   // console.log(blacklisttoken);
    if (blacklisttoken){
        return res.status(404).json({message:'unauthorized'})
        }

try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
   console.log("yaha tak");
   //console.log(decoded);

    const captain=await Captainmodel.findById(decoded._id)
    req.captain=captain;
 //   console.log(captain);
    return next();
}
    catch (err) {
    return res.status(404).json({message:'something wrong'})

}

}