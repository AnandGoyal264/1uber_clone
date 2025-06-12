import React, {useContext,useEffect,useState}  from 'react'
import {useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/usercontext'
import axios from 'axios'

const UserProtectorWrapper=({children})=>{
    const [user,setUser] =useContext(UserDataContext)
    const [isloading, setIsloading]=useState(true)
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    useEffect(() => {
        if (!token) {
          navigate('/login');
        }
      }, [token, navigate]);
    
      // ✅ Only render children if token is present
      if (!token) return null;
    
    /*axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            Authorization:`Bearer ${token}`}
        }
    ).then((response)=>{
        if (response.status==200){
           setUser(response.data.user)
           setIsloading(false)
        }

    })
    .catch((error)=>{
        console.log(error)
        localStorage.removeItem('token')
        navigate('/login')
    })
    if (isloading){
        return <div>Loading...</div>
    }*/
    
 

  return (
    <div>
      {children}
    </div>
  )

}
export default UserProtectorWrapper;


