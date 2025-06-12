const captainmodel=require('../models/captain_models.js');
const captainService=require('../services/captainservice.js');
const{validationResult}=require('express-validator')
const cookieParser=require('cookie-parser')
const Blacklisttoken=require('../models/blacklist_modules.js')



module.exports.registerCaptain=async (req,res,next)=>{
    console.log("captain register p request aa rahi h ");
const error=validationResult(req);
//console.log(req.body);
//console.log(error);
if (!error.isEmpty()){
    return res.status(400).json({error:error.array()})
}
//console.log(req.body);
const {fullname,email,password, vehicle,vehicleType}=req.body;
//console.log(req.body);
const isCaptainexists=await captainmodel.findOne({email});

if (isCaptainexists){
    return res.status(400).json({error:['email already in use']})
}
const hashedPassword=await captainmodel.hashPassword(password);
const captain=await captainService.createCaptain(
    fullname.firstname,
    fullname.lastname,
    email,
    hashedPassword,
    vehicle.color,
    vehicle.plate,
    vehicle.capacity,

    vehicleType
)
const token=await captain.generateAuthToken();

return res.status(201).json({token,captain})


}

module.exports.loginCaptain=async (req,res,next)=>{
    const error=validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    console.log("captainlogin p request aa rahi h ");
    
    const {email,password}=req.body;
   // console.log(req.body);
    const captain=await captainmodel.findOne({email}).select('+password')
    if (!captain){
        console.log("user not found")
        return res.status(404).json({error:['user not found invalid email or password']})
    }
    const isMatch=await captain.comparePassword(password,captain.password);
    if (!isMatch){
        console.log("wrong password")
        return res.status(400).json({error:['invalid password']})
    }
    const token=await captain.generateAuthToken();
    res.cookie('token',token);
    return res.status(200).json({token:token,captain:captain})
}
module.exports.getCaptainProfile=async (req,res,next)=>{
    res.status(200).json({captain:req.captain})
}
module.exports.logoutCaptain=async (req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];
await Blacklisttoken.create({token});


    res.clearCookie('token');
    res.status(200).json({message:'logout succesucclu'})

}