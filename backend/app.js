const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');

const cookieParser=require('cookie-parser')
const express =require('express')
const app=express();
const connectdb=require('./db/db.js');
const userroutes=require('./routes/useroutes.js');
const captainroutes=require('./routes/captainroutes.js');
const maproutes=require('./routes/maproutes.js')
const rideroutes=require('./routes/ride_routes.js')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
//let port =8080;

app.get('/',(req,res,next)=>{
    res.send("hi")
})

app.use('/users',userroutes);
app.use('/captains',captainroutes);
app.use('/map',maproutes)
app.use('/rides',rideroutes)
module.exports=app;