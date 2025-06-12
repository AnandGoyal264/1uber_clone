const rideModel =require('../models/ride_model.js')
const mapservice=require('../services/mapservice.js')
const {sendMessage} =require('../socket.js')




function getOtp(num){
    if (!num){
        throw new Error("Missing required field for OTP")
    }
    const otp=Math.floor(Math.random()*100000);
  //  console.log("otp calculating aa rahi h ")
   // console.log(otp);
    return otp;
 
}
async function getfare({pickup,destination}){
  //  console.log("fare calculating aa rahi h ")
  //  console.log(pickup);
  //  console.log(destination);
 //   console.log("rideservice getfare function called ");
    if (!pickup||!destination){
        throw new Error("Missing required fields for fare calculation")
    }
    const distance=await mapservice.getDistanceTime(pickup,destination);
  //  console.log("distance calculating aa rahi h ")
  //  console.log(distance);
    const distanceKm=parseFloat(distance.distance);
    const basefare={
        auto:30,
        car:40,
        bike:20,
    }
    const perKmRate={
        auto:10,
        car:15,
        bike:7
    }
    const perMinRate={
        auto:2,
        car:3,
        bike:1
    }
    const formatTime = (hours) => {
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);
        return h > 0 ? `${h} hr ${m} min` : `${m} min`;
      };
      
      const fare = {
        auto: basefare.auto + distanceKm * perKmRate.auto,
        car: basefare.car + distanceKm * perKmRate.car,
        bike: basefare.bike + distanceKm * perKmRate.bike,
        totalTime: formatTime(distanceKm / 0.02),      // If you still want this
        autoTime: formatTime(distanceKm / 25),
        carTime: formatTime(distanceKm / 40),
        bikeTime: formatTime(distanceKm / 35)
      };
      
      
 //   console.log("fare calculating aa rahi h ")
   // console.log({fare});
    return fare




}
module.exports.getfare=getfare;
module.exports.createRide=async ({vehicleType,pickup,destination,user})=>{
   // console.log({ vehicleType, pickup, destination,user });
  //  console.log("rideservice createRide function called ");

    if (!vehicleType||!pickup||!destination){
        throw new Error("missing required fields for ride creation")

    }
   // console.log(user._id);
    
    const fare=await getfare({pickup,destination});
    console.log(fare);
    const ride=rideModel.create({
        
        vehicleType,
        pickup,
        destination,
        otp:getOtp(4),
        fare:fare[vehicleType],
        user:user._id,
        


    })
    return ride





}
module.exports.confirmRide=async (rideId,captainId)=>{
  //  console.log(captainId,rideId);
    if (!rideId){
        throw new Error("missing required field for ride confirmation")}
      //  console.log("rideservice confirmRide function called ");
       const r= await rideModel.findByIdAndUpdate(rideId,{
            status:'accepted',
            captain:captainId,
            },{new:true})
//console.log(r);
        const ride=await rideModel.findById(rideId).populate('captain').select('+otp');
        if (!ride){
            throw new Error("ride not found")
            console.log("ride not found");
        }

        
            
    return ride;
}
module.exports.startRide=async (rideId)=>{
    //console.log(rideId);
    if (!rideId){
        throw new Error("missing required fields for ride start")}
      //  console.log("rideservice startRide function called ");
       const r= await rideModel.findOne({_id:rideId}).populate('captain').populate('user').select('+otp');
       await rideModel.findByIdAndUpdate(rideId,{
        status:'ongoing',
       })
       sendMessage(r.user.socketId,{
        type:'ride_started',
        data:r,
       })
       return r;}
    module.exports.endRide=async (rideId)=>{
        console.log(rideId,captain);
        if (!rideId){
            throw new Error("missing required fields for ride end")}
            console.log("rideservice endRide function called ");
       const r= await rideModel.findByIdAndUpdate(rideId,{
        status:'completed',
        //captain:captain,
       },{new:true})
       return r;

        

    }

    





