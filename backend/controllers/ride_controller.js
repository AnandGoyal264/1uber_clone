const express=require('express');
const rideservice=require('../services/rideservice.js')
const rideModel=require('../models/ride_model.js')
const {validationResult}=require('express-validator')
const mapservice=require('../services/mapservice.js')
const {sendMessage} =require('../socket.js')
module.exports.CreateRide=async (req,res,next)=>{
    const error=validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const {pickup,destination,vehicleType,user}=req.body;
 //   console.log(req.body);
    console.log(
    "create ride request ride contorllers p a rhai h "
    )
    try{
        const ride=await rideservice.createRide({pickup,destination,vehicleType,user})
       // console.log(ride);
      //  console.log(pickup);
        const pickupcordinates=await mapservice.getAddressCoordinates(pickup)
       // console.log(pickupcordinates);
        const destinationcordinates=await mapservice.getAddressCoordinates(destination)
       // console.log(destinationcordinates);
        const ltd=pickupcordinates.lat;
       const lng=pickupcordinates.lng;
        const captainInRadius=await mapservice.getCaptainRadius(ltd,lng,5000)
       // console.log(captainInRadius);
        ride.otp="";
        const ridewithcaptain=await rideModel.findOne({_id:ride._id}).populate('user')
      //  console.log('cataindekhte');
       // console.log(ridewithcaptain);
        captainInRadius.map(captain=>{
          
            if (captain.socketId){
                console.log(captain.socketId),
                console.log(captain.fullname.firstname);

            sendMessage(captain.socketId,{
                type:'new_ride',
                data:ridewithcaptain
            })}
        })
     //   console.log("ride created successfully");
        return res.status(201).json(ride)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})
    }
}
module.exports.getFare=async (req,res,next)=>{
    const {pickup,destination}=req.query;
   // console.log(req.query);
    try{
        const fare=await rideservice.getfare({pickup,destination})
        return res.status(200).json({fare})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})}}
module.exports.confirmride=async (req,res,next)=>{
    const {rideId,captainId}=req.body;
   // console.log(req.body);
    console.log("ride_controller p aa too rahi h ")
    
    try{
        const ride=await rideservice.confirmRide(rideId,captainId);
        const r=await rideModel.findOne({_id:rideId}).populate('user').populate('captain')
        console.log('rideservice function done ')
       // console.log(r.user.socketId);
        sendMessage(r.user.socketId,{
            type:'confirm_ride',
            data:ride,
        })

      //  console.log(ride);
        return res.status(200).json(ride)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})}
    
}
module.exports.startRide=async (req,res,next)=>{
    const {rideId, otp,captain}=req.body;
   // console.log(req.body);
    console.log("ride_controller p aa too rahi h ")
    try{
        const ride=await rideservice.startRide(rideId);
        console.log('rideservice function done ')
      //  console.log(ride);
        return res.status(200).json(ride)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})}
}
module.exports.endRide=async (req,res,next)=>{
    const {rideId}=req.body;
   // console.log(req.body);
    console.log("ride_controller p aa too ")
    try{
        const ride=await rideservice.endRide(rideId)
        sendMessage(ride.user.socketId,{
            type:'end_ride',
            data:ride,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})}
        return ride;
    }

    
