import React from 'react'

import {Route,Routes} from 'react-router-dom'
import {useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {useRef} from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import {useNavigate} from 'react-router-dom'
import {CaptainDataContext} from '../context/captaincontext.jsx'
import Captaindetail from '../components/Captaindetail.jsx'
import Ridepopup from '../components/Ridepopup'
import ConfirmRidepopup from '../components/ConfirmRidepopup'
import {useEffect} from 'react'
import {SocketDataContext} from '../context/socketcontext.jsx'

import axios from 'axios'
const CaptainHome= ()=>{
    const [Ridepoppanel,setRidepoppanel]=useState(false);
    const [ConfirmRidepoppanel,setConfirmRidepoppanel]=useState(false);
    const Ridepopref=useRef(null);
    const [ride,setride]=useState(null)
    const ConfirmRidepopref=useRef(null);
    const {socket} =useContext(SocketDataContext);
    const {captain}=useContext(CaptainDataContext);
    useEffect(() => {
      if (captain && captain._id) {
        console.log('🧠 Setting socket auth & connecting:', captain._id);
    
        // ✅ Ensure auth is set BEFORE socket was ever connected
        socket.auth = {
          userType: 'captain',
          userId: captain._id.toString(),
        };
    
        // 🔐 Connect only if not already connected
        if (!socket.connected) {
          socket.connect();
        }
    
        socket.on('connect',()=>{
        socket.emit('join', {
          userType: 'captain',
          userId: captain._id,
        });
      });
    
        const updateLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              socket.emit('updateLocation', {
                userId: captain._id,
                location: {
                  ltd: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              });
            });
          }
        };
    
        const localinterval = setInterval(updateLocation, 10000);
    
        return () => {
          clearInterval(localinterval);
          socket.disconnect(); // 💡 clean up
        };
      }
    }, [captain]);
    
    // Listen for ride assignment
    useEffect(() => {
      const handleNewRide = (data) => {
        console.log("✅ new ride received");
        setride(data);
        setRidepoppanel(true);
      };
    
      socket.on('new_ride', handleNewRide);
      return () => {
        socket.off('new_ride', handleNewRide);
      };
    }, [socket]);
    
    useEffect(() => {
      socket.on('connect', () => {
        console.log('✅ Connected to socket server', socket.id);
      });
      socket.on('disconnect', (reason) => {
        console.warn('❌ Disconnected from socket server:', reason);
      });
      socket.on('connect_error', (err) => {
        console.error('🚨 connect_error:', err.message);
      });
    }, []);
    useEffect(()=>{
      console.log('confirmridemessage');
      socket.on('confirm_ride', (ride) => {
        setConfirmRidepoppanel(true)});

    })
    
    
    async function confirmride (ride,captain){
    //  console.log('confirm ride function called', ride,captain);
      const response=await axios.post (`${import.meta.env.VITE_BASE_URL}/rides/confirmride`, {rideId:ride._id, captainId:captain._id});

        //console.log('confirride funtion called for confirm ride');

    }
    
    
    
    useGSAP(() => {
        const panel = Ridepopref.current;
        if (!panel) return;
        if (Ridepoppanel) {
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
      }, [Ridepoppanel]);
      useGSAP(() => {
        const panel = ConfirmRidepopref.current;
        if (!panel) return;
        if (ConfirmRidepoppanel) {
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
      }, [ConfirmRidepoppanel]);

    return (
        <div className='h-screen'>
            <div>
                <img src='' alt=''/>
                <Link to= '/home' className='text-xl fixecd right-2 '>
                <i className="ri-logout-box-line"></i>

                </Link>
                
            </div>
            <div className='h-1/2'>
            <img  src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'/> 
            </div>
          
            <div className='h-1/2 p-4 '>
               
                <Captaindetail setRidepoppanel={setRidepoppanel} />
                
             

                </div>

                <div ref={Ridepopref} className='w-full fixed  bottom-0  left-0 z-50 bg-white h-auto px-3 py-6 '> 
                   
                    <Ridepopup 
                    ride={ride}
                    confirmride={confirmride } setRidepoppanel={setRidepoppanel}  setConfirmRidepoppanel={setConfirmRidepoppanel} />        </div>
                    <div ref={ConfirmRidepopref} className='w-full fixed h-screen  bottom-0  left-0 z-50 bg-white h-auto px-3 py-6 '> 
                   
                   <ConfirmRidepopup setRidepoppanel={setRidepoppanel} setConfirmRidepoppanel={setConfirmRidepoppanel} 
                   ride={ride} />        </div> 

            </div>
          

            
    )

}
export default CaptainHome;