const captain_model=require('../models/captain_models.js');

module.exports.createCaptain=async (firstname,lastname,email,password,color,plate,capacity,vehicleType)=>{
    //const {firstname,lastname,email,password,color,plate,capacity,vehicleType}=req.body;
    if (!firstname||!lastname||!email||!password||!color||!plate||capacity==null||!vehicleType){
        throw new Error(`Missing required fields ${firstname}, ${lastname}, ${email}, ${password}, ${color}, ${plate}, ${capacity}, ${vehicleType}`);
    }
    const captain=new captain_model({
        fullname:{
        firstname,
        lastname},

        email,
        password,
        vehicle:{
        color,
        plate,
        capacity},

        vehicleType}
    )
    return await captain.save();

}