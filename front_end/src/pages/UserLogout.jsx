import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Userlogout=()=>{
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        headers:{
            Authorization:`Bearer ${token}`}
    }).then((response)=>{
        console.log(response)
        if (response.status===200){
            localStorage.removeItem('token')
            navigate('/login')

        }
       
    })
    return (
        <div>
            logout
        </div>
    )

    
}
export default Userlogout

