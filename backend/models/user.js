const express=require('express')
const mongoose =require('mongoose')
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const userschema =new mongoose.Schema({
    fullname:{
    firstname:{
        type:String,
        required:true,
        minlength:[3,'first name minlength should be 3 '],

    },
    lastname:{
        type:String,
        
        minlength:[3,'lastname should be atleast more than 3 character']
    }},
    email:{
        type:String,
        require:true,
        unique:true,
        minlength:[5,'email should be greater than 5 cahracter ']
    },
    password:{
        type:String,
        require:true,
        select:false,
       
    },
    socketId:{
        type:String,

    },



})
userschema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;

}
userschema.methods.comparePassword=async function (password){
    return await bcrypt.compare(password, this.password)
}
userschema.statics.hashPassword = function(password) {
    return bcrypt.hashSync(password, 10);  // Hash the password synchronously
};

module.exports=mongoose.model('Users', userschema);