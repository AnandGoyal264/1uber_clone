const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
        type: String,
        required: true,
        minlength:[3,'First name min length should be 3 '],
    },
        lastname:{
            type:String,
        minlength:[3,'First name min length should be 3 '],

        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
        
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type:String,
            require:true,
            minlength:[3,'Color min length should be 3 '],
        },
        plate:{
            type:String,
            require:true,
            minlength:[3,'Model min length should be 3 '],
        },
        capacity:{
            type:Number,
          required:true,
          minlength:[1,'Capacity min length should be 1 '],
        }
    },
    vehicleType:{
        type:String,
        required:true,
        enum:['bike', 'car', 'auto']
    },
    location:{
        ltd:{
            type:Number,

        },
        lng:{
            type:Number,

        }
    },

    
})
captainSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
}

captainSchema.methods.comparePassword=async function (password){
    return await bcrypt.compare(password, this.password)
}
captainSchema.statics.hashPassword=async function(password) {
    return await bcrypt.hash(password, 10);  }

module.exports = mongoose.model('Captain', captainSchema);
