import React from 'react'
import {Route,Routes} from 'react-router-dom'
import {Link} from 'react-router-dom'
const Start =()=>{
    return (
        <div className="bg-bottom bg-cover bg-[url('https://images.unsplash.com/photo-1563256014-5d7586c22430?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  bg-center h-screen pt-10 pl-5 flex justify-between flex-col w-full">

            <img className='w-14 ml-7' src='https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp'  />
            <div className='bg-white px-5 py-5'>
                <h2 className='text-2xl font-bold'> Get stated with uber </h2> 
                <Link  to='/login' className='flex item-center justify-center  w-full bg-black text-white pb-7  py-3 rounded mt-2 '> Continue </Link>

            </div>
        </div>
    )

}
export default Start;

