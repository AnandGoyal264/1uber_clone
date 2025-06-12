import React from 'react'
import {CaptainDataContext} from '../context/captaincontext.jsx'
import {useContext} from 'react'



const Ridepopup=(props)=>{
const {captain}=useContext(CaptainDataContext);

    return (
        <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={()=>{
           props.setRidepoppanel(false)
           props.setConfirmRidepoppanel(false)
            
        }} ><i className="ri-arrow-down-wide-fill"></i>
             </h5>
            <h3 className='text-2xl font-semibold mb-5'> 
               New ride available 
            </h3>
            <div className='flex items-center gap-3 bg-yellow-400 '>
                <div>
                    <img className='h-12 w-12 rounded object-cover' src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'/> 
                    <p> {props.ride?.user.fullname.firstname + " " +props.ride?.user.fullname.lastname} </p>
            </div>

            <h3 className='text-lg font-semibold '> 2.2 km </h3> 
            </div>
            <div className='flex justify-between flex-col gap-2  items-center  '> 
            <img className='h-20' src='https://png.pngtree.com/png-clipart/20231005/original/pngtree-cab-icon-vector-image-symbol-transport-design-vector-png-image_12962757.png'/>
            <div className='w-full'>
                <div className='flex items-center gap-3  '> 
                <i className=" text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '> 566- A </h3>
                    <p className=' text-base text-gray '> {props.ride?.pickup} </p>
                </div>
                </div>
                <div>
                <div className='flex items-center gap-3  '> 
                <i className="ri-map-pin-range-fill"></i>
               <div>
                    <h3 className='text-lg font-medium '> 566- A </h3>
                    <p className=' text-base text-gray '> {props.ride?.destination} </p>
                </div>
                </div>
                    
                    
                     </div>
                <div>
                <div className='flex items-center gap-3  '> 
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '> {props.ride?.fare} </h3>
                    <p className=' text-base text-gray '> Cash </p>
                </div>
                </div> </div>



            </div>
            <button className='w-full bg-green-500 text-white font-semibold p-2 rounded ' onClick={()=>{
                props.setConfirmRidepoppanel(true)
                props.confirmride(props.ride,captain);
            }}> Accept  </button>
             <button  onClick={()=>{
           props.setRidepoppanel(false)
            
        }} className='w-full bg-gray-500 text-white font-semibold p-2 rounded ' > Ignore   </button>
            </div>
        
    </div>

    )
}
export default Ridepopup;