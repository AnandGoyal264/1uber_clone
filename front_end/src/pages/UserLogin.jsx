import React from 'react'
import {Route,Routes} from 'react-router-dom'
import {Link} from 'react-router-dom'

import {useState} from'react'
import {UserDataContext} from '../context/usercontext'

import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const UserLogin =()=>{
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [userdata,setuserdata]=useState({});
    const [user,setUser]=useContext(UserDataContext)
const navigate=useNavigate()


    const submithandler=async (e)=>{
        e.preventDefault()
        console.log(email,password)
       const userdata={
        email:email,
        password:password
       }
       const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userdata)
        if (response.status==200){
            const data=response.data;
         //  console.log(data.user)
         // console.log('ggggg')
            setUser(data.user)
        localStorage.setItem('token',data.token)

            navigate('/home')
        }
        setemail('')
        setpassword('')
    }
    return (
        <div className='p-7 flex flex-col justify-between'>
            <div> 
            <img className='w-14 mb-10' src='https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp'  />

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
             <p> new user </p>   <Link  className ='mb-5 text-blue-600'to='/signup'>  Create a account </Link>
            </form>
            </div>
<br/>
            <div>
                
            <Link to='/captain-login' className='mt-4 bg-blue-500 text-white  rounded px-2 py-2 border w-full text-xl  '>
                    Sign as a captain 
                    </Link>
            </div>

           
            
                
        </div>
    )

}
export default UserLogin

