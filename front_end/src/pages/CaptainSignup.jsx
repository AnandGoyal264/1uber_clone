import React from 'react'

import {Route,Routes} from 'react-router-dom'
import {useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {CaptainDataContext} from '../context/captaincontext.jsx'
import axios from 'axios'
const CaptainSignup=()=>{
     const [email,setemail]=useState('')
        const [password,setpassword]=useState('')
        const [firstname,setfirstname]=useState('')
        const [lastname,setlastname]=useState('')
        const [userdata ,setuserdata]=useState({})
        const [vehicleColor,setvehicleColor]=useState('')
        const [vehiclePlate,setvehiclePlate]=useState('')
        const [vehicleType,setvehicleType]=useState('')
        const [vehicleCapacity,setvehicleCapacity]=useState('')

        const {captain,setcaptain}=useContext(CaptainDataContext)
        const navigate=useNavigate()
        const submithandle=async (e)=>{
          e.preventDefault()
          const newuser={
            fullname:{
              firstname:firstname,
              lastname:lastname
            },
            password:password,
            email:email,
            vehicle:{
              color:vehicleColor,
              plate:vehiclePlate,
              capacity:vehicleCapacity,
            },
            vehicleType:vehicleType
          }
          const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newuser)
          if (response.status===201){
            const data=response.data;
            setcaptain(data.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain_home')}
          
          
          setemail('')
          setpassword('')
          setfirstname('')
          setlastname('')
          setvehicleCapacity('')
          setvehicleColor('')
          setvehiclePlate('')
          setvehicleType('')
         // console.log("form submitted")
        //  console.log('form submitted')
      }
    return (
        <div>
           <div className='p-7 flex flex-col justify-between'>
                  <div> 
                  <img className='w-14 mb-10' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s'  />
          
                  <form  onSubmit={(e)=>{
                    submithandle(e)}}>
                
                    <h3> what is your name </h3>
                    <div className='flex gap-2'>
                    <input required 
                    type='text' className='bg-white rounded px-2 py-2 border w-1/2 text-xl  ' placeholder='firstname' value={firstname} onChange={(e)=>{
                      setfirstname(e.target.value)
                    }

                    }>
                      </input>
                      
                      <input required 
                    type='text' className='bg-white rounded px-2 py-2 border w-1/2 text-xl  ' placeholder='lastname' value={lastname}
                    onChange={(e)=>{
                      setlastname(e.target.value)
                    }}>
                      </input>

                      </div>

                      <h3 className='text-xl mb-2'> What is your email </h3>
                      <input required 
                    type='email' className='bg-white rounded px-2 py-2 border w-full text-xl  ' placeholder='example@.com' value={email}
                    onChange={(e)=>{
                      setemail(e.target.value)
                    }}>
                      </input>
                      <h3 className='text-xl mb-2'> Password </h3>
                      <input required type='password' 
                          className='bg-white rounded px-2 py-2 border w-full text-xl  ' placeholder='password' value={password}
                          onChange={(e)=>{
                            setpassword(e.target.value)
                          }}>
                      </input>

                      <div className='text-lg,mb-2, font-bold'> Vechile information 
                            <div className='flex gap-2 mb-7'>
                              <input required 
                              type='text' className='bg-[#eeeeee] rounded-lg  px-2 py-2 'placeholder='color' 
                  value={vehicleColor} onChange={(e)=>{
                    setvehicleColor(e.target.value)
                  }}
                    >

                              </input>
                      </div>
<div className='flex gap-2 mb-7'>
                              <input required 
                              type='text' className='bg-[#eeeeee] rounded-lg  px-2 py-2 'placeholder='plate'
                              value={vehiclePlate}
                              onChange={(e)=>{
                    setvehiclePlate(e.target.value)}}>
                    </input>
                    </div>
                    <div className='flex gap-2 mb-7'>
                              
                    <input required 
                    type='number'
                    className='bg-[#eeeeee] rounded-lg  px-2 py-2 'placeholder='capacity' 
                    value={vehicleCapacity} 
                    onChange={(e)=>{
                      setvehicleCapacity(e.target.value)
                    }}>

                    </input>
                    </div>

                    <div className='mb-4'>

  <label className='block text-lg font-bold mb-2'>Vehicle Type</label>
  <select
    required
    className='bg-[#eeeeee] rounded-lg px-2 py-2 w-full'
    value={vehicleType}
    onChange={(e) => setvehicleType(e.target.value)}
  >
    <option value=''>-- Select Type --</option>
    <option value='car'>Car</option>
    <option value='bike'>Bike</option>
    <option value='auto'>Auto</option>
  </select>
</div>




                      </div>
                      <button className='bg-black text-white  rounded px-2 py-2 border w-full text-xl  '>
                          Login
                      </button>
                      <Link   className ='mb-5 text-blue-600'to='/captain-login'>  login as a captain </Link>
                  </form>
                  </div>
          <br/>
                  <div>
                      
                  <Link to='/login' className='mt-4 bg-blue-500 text-white  rounded px-2 py-2 border w-full text-xl  '>
                          Sign as an User 
                          </Link>
                  </div>
          
                 
                  
                      
              </div>
        </div>
    )
}
export default CaptainSignup;