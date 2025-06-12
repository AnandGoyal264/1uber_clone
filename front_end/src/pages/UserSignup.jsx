import React from 'react'
import {Route,Routes} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useState} from'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/usercontext'
import {useContext} from 'react'


const UserSignup =()=>{
   
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [userdata ,setuserdata]=useState({})
    const [user,setuser]=useContext(UserDataContext)
    const navigate = useNavigate();
    
    const submithandle= async (e)=>{
      e.preventDefault()

      const newuser={
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        password:password,
        email:email
      }

      //console.log(`${import.meta.env.VITE_BASE_URL}`)
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newuser)
      if (response.status==200){
        const data=response.data;
       // console.log(data);
        
        setuser(data.user)
        localStorage.setItem('token',data.token)
       // console.log('navigation to the home ..page ')
        navigate('/home')

      }
      else{
   //console.log(response.data)
      }
      console.log(email)
      console.log(userdata)
      setemail('')
      setpassword('')
      setfirstname('')
      setlastname('')
      console.log('form submitted')
  }
    return (
        <div>
           <div className='p-7 flex flex-col justify-between'>
                  <div> 
                  <img className='w-14 mb-10' src='https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp'  />
          
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
                      <button className='bg-black text-white  rounded px-2 py-2 border w-full text-xl  '>
                          Create Account
                      </button>
                      <Link   className ='mb-5 text-blue-600'to='/captain-signup'>  register as a captain </Link>
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
export default UserSignup;

