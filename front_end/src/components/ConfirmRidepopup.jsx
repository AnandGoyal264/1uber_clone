import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

const ConfirmRidepopup = (props) => {
  const navigate=useNavigate();
    const [otp,setotp]=useState('');

    const submitHandler=async (e)=>{
       e.preventDefault();
       const r=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
        rideId:props.ride?._id,
        otp:props.ride?.otp,
        captain:props.ride?.captain
        })
        console.log(r);
        navigate('/captain-riding' ,{state:{ride:props.ride}})

    }
  return (
    <div className='p-4 relative bg-white rounded shadow-md'>
      <h5
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
        onClick={() => {
          props.setRidepoppanel(false);
          props.setConfirmRidepoppanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5 text-center'>New ride available</h3>

      <div className='flex items-center gap-3 bg-yellow-400 p-3 rounded'>
        <img
          className='h-8 w-12 rounded object-cover'
          src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60'
          alt='Passenger'
        />
        <div>
          <p className='font-medium'>{props.ride?.user.fullname.firstname}</p>
        </div>
        <h3 className='text-lg font-semibold ml-auto'>2.2 km</h3>
      </div>

      <div className='flex flex-col items-center gap-4 mt-4'>
      

        <div className='w-full space-y-3'>
          <div className='flex items-center gap-3'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>566-A</h3>
              <p className='text-base text-gray-500'>{props.ride?.pickup}</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <i className="text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>566-A</h3>
              <p className='text-base text-gray-500'>{props.ride?.destination}</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <i className="text-lg ri-money-rupee-circle-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
              <p className='text-base text-gray-500'>Cash</p>
            </div>
          </div>
        </div>
        <div className=' w-full mt-4  '> 
            <div> 
                <form onSubmit={(e)=>{
                    submitHandler(e);
                }

                }> 
                    <input type='text' placeholder='otp' className='font-mono rounded bg-gray-100 w-full h-auto mt-3 mb-3  '
                    onChange={(e)=>{
                        setotp(e.target.value);
                    }}>
                    </input>
                    <button 
         
         className='w-full bg-green-500 text-white font-semibold p-2 m-3 rounded text-center'
       >
         Confirm
       </button>
                </form>
            </div>
       

        <button
          onClick={() => {
            props.setRidepoppanel(false);
            props.setConfirmRidepoppanel(false);
          }}
          className=' m-3 bg-red-500 text-white font-semibold p-2 rounded'
        >
          Cancel
        </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidepopup;
