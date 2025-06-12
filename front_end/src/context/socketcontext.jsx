import React,{createContext, useEffect} from 'react'
import {io} from 'socket.io-client'
export const SocketDataContext=createContext()
const socket = io(import.meta.env.VITE_BASE_URL, { autoConnect: false });
const SocketContext=({children})=>{
    useEffect(()=>{
        socket.on('connect',()=>{
           // console.log('Connected to socket server',socket.id)
            console.log(Date());
        });
        socket.on('disconnect',(reason)=>{
            console.log('Disconnected from socket server',socket.id)
         //   console.log(reason);
          //  console.log(Date());
        });
       
    },[socket])
  
    return(
        <SocketDataContext.Provider value={{socket}}>
            {children}
        </SocketDataContext.Provider>
    )
}
export default SocketContext;