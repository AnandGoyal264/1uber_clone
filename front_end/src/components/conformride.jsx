import React from 'react'
import {useState} from 'react'
const ConfirmRide =(props)=>{
    const pickup=props.pickup;
    
    const destination=props.destination;
    const vehicleType=props.vehicleType;
    
    const fare=props.fare;
    ;
    const total_price=Math.floor(fare[vehicleType]);
    const newtime=vehicleType+'Time';
    const time=fare[newtime];
    const [Ridepopuppanel,setRidepopuppanel]=useState(false);
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'
            onClick={()=>{
                props.setvehiclePanel(false)
                props.setconfirmRidePanel(false)
                
            }} ><i className="ri-arrow-down-wide-fill"></i>
                 </h5>
                <h3 className='text-2xl font-semibold mb-5'> 
                    Confirm your ride 
                </h3>
                <div className='flex justify-between flex-col gap-2  items-center  '> 
                <img className='h-20' src='https://png.pngtree.com/png-clipart/20231005/original/pngtree-cab-icon-vector-image-symbol-transport-design-vector-png-image_12962757.png'/>
                <div className='w-full'>
                    <div className='flex items-center gap-3  '> 
                    <i className=" text-lg ri-map-pin-2-fill"></i>
                    <div>

                        <p className=' text-base text-gray '> {destination} </p>
                    </div>
                    </div>
                    <div>
                    <div className='flex items-center gap-3  '> 
                    <i className="ri-map-pin-range-fill"></i>
                   <div>
                    
                        <p className=' text-base text-gray '> {pickup} </p>
                    </div>
                    </div>
                        
                        
                         </div>
                    <div>
                 
                   
                    <div className='flex flex-col justify-start gap-3 '>
                    <div className='flex gap-3 '>
                    <i className="ri-money-rupee-circle-fill"></i>
                        <h3 className='text-lg font-medium '> {total_price} </h3>
                        <p className=' text-base text-gray '> </p>
                    </div>
                    <div>
                        <h3 className='text-lg font-medium '> {time} </h3>
                        <p className=' text-base text-gray '>  </p>
                    </div>
                    </div>
                    </div> 



                </div>
                <button className='w-full bg-green-500 text-white font-semibold p-2 rounded ' onClick={()=>{
                    props.setvehiclefound(true)
                    props.createRide();
                }}> Confirm  </button>
                </div>
            
        </div>
    )
}
export default ConfirmRide;