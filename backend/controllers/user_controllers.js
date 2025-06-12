const User=require('../models/user.js');
const Userservice=require('../services/userservice.js');
const {validationResult}=require('express-validator')
const Blacklisttoken=require('../models/blacklist_modules.js')
module.exports.registerUser=async (req,res, next)=>{
    const error=validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    console.log("register p request aa rahi h ");
    const {fullname, email,password}=req.body;
    const isUserExist=await User.findOne({email});
    if (isUserExist){
        return res.status(400).json({message:
            "user already exist"
        })
    }
    const hashedPassword=await User.hashPassword(password);
    const firstname=fullname.firstname;
    const lastname=fullname.lastname;
    const user=await Userservice.createUser({firstname,lastname,email,
        password:hashedPassword})

    
    const token=user.generateAuthToken();
    res.status(200).json({token,user})
}
module.exports.loginUser=async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
       return  res.status(400).json({erros:errors.array()})
    }
    console.log("loginprequest aa rahai h ")
    const{email,password}=req.body;
   
    const user=await User.findOne({email}).select('+password')
    if (!user){
        return res.status(404).json({message:'user not found invalid email or password'})
    }
    const ismatch=await user.comparePassword(password);
    if (!ismatch){
        return res.status(404).json({message:'wrong password'})
    }
    const token=user.generateAuthToken();
    return res.status(200).json({token:token,user})
    


}
module.exports.getUserProfile=async (req,res,next)=>{
    return res.status(400).json(req.user);


}
module.exports.logoutuser=async (req,res,next)=>{
    console.log("logout request aa rahai h ")
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];
console.log(token);
    res.clearCookie(token);
    await Blacklisttoken.create({token:token})
   
    return res.status(200).json({message:'logout'})


}

    





