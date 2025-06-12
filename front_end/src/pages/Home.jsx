// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Locationsearchpanel from '../components/Localsearcpanel';
import ConfirmRide from '../components/conformride'
import Lookingfordriver from '../components/Lookingfordriver'
import Waitingfordriver from '../components/Waitingfordriver'
import Ridepopup from '../components/Ridepopup'
import axios from 'axios'
import {SocketDataContext } from '../context/socketcontext'
import { UserDataContext } from '../context/usercontext'; 
import {useContext} from'react'
import {useNavigate} from'react-router-dom'


const Home = () => {
  const [pickup, setpickup] = useState('');
  const [destination, setdestination] = useState('');
  const [panelopen, setPanelopen] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel,setconfirmRidePanel]=useState(false);
  const[vehiclefound,setvehiclefound]=useState(false);
  const [waitingfordriverPanel,setwaitingfordriverPanel]=useState(false);
  const [pickupsuggestions,setpickupsuggestions]=useState([]);
  const [destinationsuggestions,setdestinationsuggestions]=useState([]);
  const [activefield,setactivefield]=useState(null);
  const [fare,setgetfare]=useState({});
  const [vehicleType,setvehicleType]=useState('');
  const {socket}=useContext(SocketDataContext);
  const [user]=useContext(UserDataContext);
  const [driverdata,setdriverdata ]=useState({});
  const navigate=useNavigate();
  //console.log(user);
  
  useEffect(()=>{
    console.log("useeffect k ander ");
    console.log(user);
    if (user && user._id){
    socket.auth = {
      userType: 'user',
      userId: user._id.toString(),
    };

    if (!socket.connected) {
      socket.connect();
    }

    socket.on('connect',()=>{
    socket.emit('join', {
      userType: 'user',
      userId: user._id,
    });
  })
    console.log('message shyd sent from fronted useeffect')
   // sendmessage("join",{userType:"user",userId:user.id});
  }},[user]);
  useEffect(()=>{
  socket.on('confirm_ride',(data)=>{
    setwaitingfordriverPanel(true);
    //console.log('confirm_ride recieeved' ,data);
    //console.log('kyo ni chl raha bey');
    //console.log('Type:', typeof data);
//console.log('Data:', data);

    setdriverdata(data);
    

  })},[]);
  useEffect(() => {
    const handleRideStarted = (data) => {
      //console.log('ride_started received:', data);
      navigate('/riding',{state:{ride:data}});
    };
  
    if (socket) {
      socket.on('ride_started', handleRideStarted);
    }
  
    // Cleanup to prevent duplicate listeners
    return () => {
      if (socket) {
        socket.off('ride_started', handleRideStarted);
      }
    };
  }, [socket]); // Add socket as a dependency if it's coming from context or props
  
  
  const handlePickupChange=async (e)=>{
    setpickup(e.target.value);
    try{
      const suggestions=await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,{params:{query:e.target.value}})
      setpickupsuggestions(suggestions.data);
    }
    catch(error){
      console.log(error);
      setpickupsuggestions([]);
      console.log('error fetching suggestions');

    }
  }
  const handledestinationChange=async (e)=>{
    setdestination(e.target.value);
    try{
      const suggestions=await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,{params:{query:e.target.value}})
      setdestinationsuggestions(suggestions.data);
     // console.log(suggestions.data);
    }
    catch(error){
      console.log(error);
      setdestinationsuggestions([]);
      console.log('error fetching suggestions');
  }}


  const Panelref = useRef(null);
  const Panel2ref = useRef(null);
  const Panelclose = useRef(null);
  const vehiclePanelref = useRef(null);
  const confirmRidePanelref=useRef(null);
  const vehicleFoundRef=useRef(null);
 const waitingfordriverPanelref=useRef(null); 

  const submithandler = (e) => {
    e.preventDefault();
    console.log(pickup, destination);
    setpickup('');
    setdestination('');
  };

  useGSAP(() => {
    if (panelopen) {
      gsap.to(Panelref.current, {
        height: '70%',
        opacity: 1,
      });
      gsap.to(Panel2ref.current, {
        opacity: 0,
      });
      gsap.to(Panelclose.current, {
        opacity: 1,
      });
    } else {
      gsap.to(Panelref.current, {
        height: 0,
        opacity: 1,
      });
      gsap.to(Panel2ref.current, {
        opacity: 1,
      });
      gsap.to(Panelclose.current, {
        opacity: 0,
      });
    }
  }, [panelopen]);

  useGSAP(() => {
    const panel = vehiclePanelref.current;
    if (!panel) return;
    if (vehiclePanel) {
      gsap.to(panel, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(panel, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [vehiclePanel]);
  useGSAP(() => {
    const panel = confirmRidePanelref.current;
    if (!panel) return;
    if (confirmRidePanel) {
      gsap.to(panel, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(panel, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    const panel = vehicleFoundRef.current;
    if (!panel) return;
    if (vehiclefound) {
      gsap.to(panel, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(panel, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [vehiclefound]);
  useGSAP(() => {
    const panel = waitingfordriverPanelref.current;
    if (!panel) return;
    if (waitingfordriverPanel) {
      gsap.to(panel, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(panel, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [waitingfordriverPanel]);



  useEffect(() => {
    console.log('vehiclePanel state:', vehiclePanel);
  }, [vehiclePanel]);

  async function findTrip(){
    console.log('finding trip');
    setPanelopen(false);
    setvehiclePanel(true);
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/fare`,{params:{pickup,destination}})
   // console.log("ni chl raha kya")
   // console.log(
   //   `Fare for ride from ${pickup} to ${destination} is ${response.data.fare}`
    //)
    setgetfare(response.data.fare);
    //console.log(response.data);
  }
  async function createRide(){
   // console.log(vehicleType);
   // console.log('frontend create ride',user);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{pickup,destination,vehicleType,user})
  //  console.log(response.data);
    
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        className='w-16 absolute left-5 top-6'
        src='https://download.logo.wine/logo/Uber/Uber-Logo.wine.png'
      />
      <div className='w-screen h-screen'>
        <img
          ref={Panel2ref}
          className='w-full object-cover'
          src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'
        />
      </div>

      <div className='flex flex-col justify-end absolute h-screen top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5
            ref={Panelclose}
            onClick={() => setPanelopen(false)}
            className='absolute top-6 right-1 text-2xl cursor-pointer opacity-0'
          >
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h1 className='text-2xl font-semibold'>Find a place</h1>
          <form onSubmit={submithandler}>
            <input
              className='bg-[#eeeeee] text-base px-5 py-2 w-full rounded-xl mb-2'
              type='text'
              placeholder='add a pickup location'
              value={pickup}
              onClick={() => {setPanelopen(true);
                setactivefield('pickup');}
              }
              onChange={(e) => {setpickup(e.target.value),
                handlePickupChange(e)}
              }
              
            />
            <input
              className='bg-[#eeeeee] text-base px-5 py-2 w-full rounded-xl'
              type='text'
              placeholder='enter your destination'
              value={destination}
              onClick={() =>{ setPanelopen(true);
                setactivefield('destination');}
              }
              onChange={(e) => {setdestination(e.target.value),
                handledestinationChange(e)}
              }
            />
          </form>
          <button
           className='bg-blue-500 text-white w-full mt-5 border-blue rounded-full'
           onClick={findTrip}>
           search 

          </button>
        </div>

        <div ref={Panelref} className='bg-white h-0 opacity-0 overflow-hidden'>
        <Locationsearchpanel
  suggestions={activefield === 'pickup' ? pickupsuggestions : destinationsuggestions}
  activeField={activefield}
  setPickup={setpickup}
  setDestination={setdestination}
  setPanelopen={setPanelopen}
  setvehiclePanel={setvehiclePanel}
  setpickupsuggestions={setpickupsuggestions}
  setdestinationsuggestions={setdestinationsuggestions}
/>

        </div>
      </div>

      <div
        ref={vehiclePanelref}
        className='w-full fixed bottom-0 left-0 z-50 bg-white h-auto px-3 py-6 opacity-0'
      >
      <h5 className='p-3 text-center w-[93%] absoulte top-0 '> <i  onClick={()=>{
        setvehiclePanel(false)
      }}className ="text-3xl ri-arrow-down-wide-fill"></i></h5>  
        <h1 className='text-lg font-semibold mb-4'>Choose a Vehicle</h1>

        {[{
          img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png',
          name: 'car',
          seats: 4,
          time: `${fare.carTime}`,
          
          
          desc: 'Affordable, compact rides',
          price: `₹${Math.floor(fare.car)}`
        }, {
          img: 'https://static.toiimg.com/thumb/msid-98228989,imgsize-496903,width-400,resizemode-4/uber-bike-taxi.jpg',
          name: 'bike',
          seats: 1,
          time: `${fare.bikeTime}`,
          
          
          desc: 'Affordable, bike rides',
          price: `₹${Math.floor(fare.bike)}`
        }, {
          img: 'https://techpp.com/wp-content/uploads/2018/01/uber-auto-bangalore.png',
          name: 'auto',
          seats: 3,
          time: `${fare.autoTime}`,
          desc: 'Affordable, auto rides',
          price:`₹${Math.floor(fare.auto)}`,
        }].map((v, i) => (
          <div
          onClick={()=>{
            setconfirmRidePanel(true);
            setvehicleType(v.name)
             }}
            key={i}
            className='w-full border-2 border-black rounded-xl flex items-center justify-between p-3 mb-4'
          >
            <img className='h-12' src={v.img} />
            <div className='w-1/2 px-3'>
              <h4 className='font-medium text-sm'>{v.name}</h4>
              <span className='text-xs flex items-center gap-1'>
                <i className='ri-user-fill'></i> {v.seats}
              </span>
              <h5 className='font-medium text-sm'>{v.time} away</h5>
              <p className='text-sm'>{v.desc}</p>
            </div>
            <h2 className='text-xl'>{v.price}</h2>
          </div>
        ))}
      </div>
      <div
        ref={confirmRidePanelref}
        className='w-full fixed bottom-0 left-0 z-50 bg-white h-auto px-3 py-6 opacity-0'
      >
       
        <ConfirmRide setvehiclefound={setvehiclefound} setvehiclePanel={setvehiclePanel} setconfirmRidePanel={setconfirmRidePanel}
        vehicleType={vehicleType} createRide={createRide}
        pickup ={pickup} destination={destination} fare={fare}> </ConfirmRide>
        </div> 
        <div
       
         ref={vehicleFoundRef}className='w-full fixed bottom-0 left-0 z-50 bg-white h-auto px-3 py-6 opacity-0'
      >
            <Lookingfordriver  setvehiclefound={setvehiclefound} setconfirmRidePanel={setconfirmRidePanel}
            vehicleType={vehicleType} createRide={createRide}
            pickup ={pickup} destination={destination} fare={fare} />
        </div>
        
         <div
         ref={waitingfordriverPanelref} className='w-full fixed bottom-0 left-0 z-50 bg-white h-auto px-3 py-6 opacity-0'
      >
            <Waitingfordriver   driverdata={driverdata} waitingfordriverPanel={waitingfordriverPanel}  />
        </div>
    </div>
  );
};

export default Home;
