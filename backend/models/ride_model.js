const mongoose=require('mongoose')
const schema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'

    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain'
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','completed','ongoing','cancelled'],
        default:'pending'
        
    },
    duration:{
        type:Number,
        default:0
    },
    distance:{
        type:Number,
        
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,
    }
})
module.exports=mongoose.model('ride',schema);
