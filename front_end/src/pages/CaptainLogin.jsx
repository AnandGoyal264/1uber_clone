import React from 'react'
import {Route,Routes} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import {CaptainDataContext} from '../context/captaincontext'
import axios from 'axios'

const CaptainLogin =()=>{
    const [email,setemail]=useState('')
        const [password,setpassword]=useState('')
        const [userdata,setuserdata]=useState({});
        const {captain,setcaptain}=useContext(CaptainDataContext)
        const navigate=useNavigate();

        const submithandler=async (e)=>{
            e.preventDefault()
         //   console.log(email,password)
            const captain={
                email:email,
                password:password
    
            }
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)
            if (response.status==200){
                const data=response.data
                localStorage.setItem('token',data.token)
                setcaptain(data.captain)
                navigate('/captain-home')
            }
           // setcaptain(newcaptain)

    
            setemail('')
            setpassword('')
        }
    return (
        <div className='p-7 flex flex-col justify-between'>
        <div> 
        <img className='w-14 mb-10' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s'  />

        <form onSubmit={(e)=>{
            submithandler(e)
        }}>
            <h3 className='text-xl mb-2'> What is your email </h3>
            <input required 
            value={email} onChange={(e)=>{
                setemail(e.target.value)
            }} type='email' className='bg-white rounded px-2 py-2 border w-full text-xl  ' placeholder='example@.com'>
            </input>
            <h3 className='text-xl mb-2'> Password </h3>
            <input required type='password' value={password}  onChange={(e)=>{
                setpassword(e.target.value)}}
                className='bg-white rounded px-2 py-2 border w-full text-xl  ' placeholder='password'>
            </input>
            <button className='bg-black text-white  rounded px-2 py-2 border w-full text-xl  '>
                Login
            </button>
            <Link   className ='mb-5 text-blue-600'to='/captain-signup'>  register as a captain </Link>
        </form>
        </div>
<br/>
        <div>
            
        <Link to='/login' className='mt-4 bg-blue-500 text-white  rounded px-2 py-2 border w-full text-xl  '>
                Sign as an user
                </Link>
        </div>

       
        
            
    </div>
    )

}
export default CaptainLogin;

