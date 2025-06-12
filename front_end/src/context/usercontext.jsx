import React ,{createContext} from 'react'
import {useState} from 'react'
import {Route,Routes} from 'react-router-dom'
import {Link }  from 'react-router-dom'
export const UserDataContext=createContext()
const UserContext=({children})=>{
    const [user,setUser]=useState({
        email:'',
        fullname:{
            firstname:'',
            lastname:''
        },
        password:'',
    })
    return (
       <UserDataContext.Provider value={[user,setUser]}>
            {children}

       </UserDataContext.Provider>

        
    )
}
export default UserContext;
