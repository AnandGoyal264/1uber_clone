import React from 'react'
import {useLocation} from 'react-router-dom'
import {useContext} from 'react'
import {SocketDataContext } from '../context/socketcontext'
import {useNavigate} from 'react-router-dom'


const Riding=()=>{
      const {socket}=useContext(SocketDataContext);
      const navigate=useNavigate()
    
    const location=useLocation()
    const ride=location.state?.ride;
    socket.on('end_ride',()=>{
        console.log('ride_ended')
        navigate('/home')
    })
    return (
        <div className='h-screen'>
            <div className='h-1/2'>
            <img  src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'/> 
            </div>
            <h1> Riding </h1>
            <div className='h-1/2'>
            <div className=' gap-2 items-center '>
            <div  className='flex justify-between items-center '> 
            <img className='h-40 w-40 cover '  src='https://png.pngtree.com/png-clipart/20231005/original/pngtree-cab-icon-vector-image-symbol-transport-design-vector-png-image_12962757.png'/>
            <div className='text-right '>
                <h2 className=' text-lg font-medium '>{ride?.captain?.fullname.firstname}</h2>
                
                <h4 className='text-xl font-semibold '>{ride?.captain?.vechile?.plate} </h4>
                <p className='text-sm text-gray-600'> Maruti suzuki {ride?.captain?.vechileType} </p>
                
                </div>
                </div>
                
              <div className='flex items-center gap-3'> 
               <div className='flex items-center justify-between  flex-col'> 
                <div className='flex items-center gap-3  '> 
                <i className="ri-map-pin-range-fill"></i>
               <div>
                    <h3 className='text-lg font-medium '> 566- A </h3>
                    <p className=' text-base text-gray '> {ride?.destination} </p>
                </div>
                </div>
                    
                    
                     </div>
                <div>
                <div className='flex items-center gap-3  '> 
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '> {ride?.fare}</h3>
                    <p className=' text-base text-gray '> Cash </p>
                </div>
                </div> </div>


                </div>

            </div>
            <button onClick={()=>{
                navigate('/home')
            }}
             className='h-3 w-full text-sm py-10 bg-green-400 text-white font-semibold '> make a payment </button>

            </div>
            
        </div>
    )
}
export default Riding 