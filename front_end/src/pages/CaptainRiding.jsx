import React from 'react'
import {Link ,useLocation} from 'react-router-dom'
import {useState,useContext} from 'react'

import {useRef} from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap'
import Finishride from '../components/Finishride'

const CaptainRidding=()=>{
    const [finishridepanel, setfinishridepanel]=useState(false)
    const finishrideref=useRef(null)
    const location=useLocation();
    const rideData=location.state?.ride;


    useGSAP(() => {
        const panel = finishrideref.current;
        if (!panel) return;
        if (finishridepanel) {
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
      }, [finishridepanel]);


    return (
        <div className='h-screen'>
            <div>
                <img src='' alt=''/>
                <Link to= '/home' className='text-xl fixecd right-2 '>
                <i className="ri-logout-box-line"></i>

                </Link>
                
            </div>
            <div className='h-4/5'>
            <img  className='h-full 'src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'/> 
            </div>
          
            <div className='h-1/5 p-2 bg-yellow-400 flex justify-between   items-center '
            onClick={()=>{
                setfinishridepanel(true);
            }}>

               <h4 className='font-bold text-lg justify-between  items-center  '> 5km </h4>
               <button className=' w-40 h-20 bg-green-500 text-white font-semibold  rounded '> Complete Ride </button>
               
                
             

                </div>
                <div ref={finishrideref} className='w-full fixed h-screen  bottom-0  left-0 z-50 bg-white h-auto px-3 py-6 opacity-0'> 
                <Finishride rideData={rideData} setfinishridepanel={setfinishridepanel} />
                        </div>
                <div >
                   
                </div>

            

            </div>
    )
}

export default CaptainRidding;