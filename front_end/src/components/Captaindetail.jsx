import React from 'react'
import {useContext } from 'react'
import {CaptainDataContext} from '../context/captaincontext.jsx'
import {useCaptain} from '../context/captaincontext.jsx'

const Captaindetail=(props)=>{

    const {captain}=useContext(CaptainDataContext)
    //console.log(captain)
    //console.log(captain.fullname)
   // console.log(`${captain} is logged in `)
    return (
        <div onClick={()=>{
            props.setRidepoppanel(true);
     
        }}> 
        <div className='flex items-center justify-between p-3  '>
        <div className='flex items-center justify-start  gap-3 '>
            <img className='h-10 w-10 rounded-full object-cover ' src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'alt =''/>
            <h2 className='text-large font-medium text-gray-600'>{captain.fullname.firstname } {captain.fullname.lastname} </h2>

        </div>
        <div>
            <h4 className='text-xl font-semibold'> 3980</h4>
            <p className='text-sm font-medium '> earned </p>
        </div>
    </div>
    <div className='flex justify-center items-center gap-3 '>
        <div className='text-center'>
        <i className="text-2xl font-thin ri-timer-fill"></i>
        <h5 className='text-lg font-medium'> 10.2</h5>
        <p className='text-sm text-gray-600 '> Hours online </p>
        </div>
        <div>
        <i className="text-2xl font-thin ri-speed-up-line"></i>
        <h5 className='text-lg font-medium'> 10.2</h5>
        <p className='text-sm text-gray-600 '> Hours online </p>
        </div>
        <div><i className="text-2xl font-thin ri-book-2-fill"></i>
        <h5 className='text-lg font-medium'> 10.2</h5>
        <p className='text-sm text-gray-600 '> Hours online </p></div>

    </div>
    </div>
    )
}
export default Captaindetail;