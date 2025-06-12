import React from 'react'
const Lookingfordriver=(props)=>{
    return (
        <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={()=>{
          
            props.setconfirmRidePanel(false)
        }} ><i  onClick={()=>{
            props.setvehiclefound(false);
        }} className="ri-arrow-down-wide-fill"></i>
             </h5>
            <h3 className='text-2xl font-semibold mb-5'> 
                Looking for your ride 
            </h3>
            <div className='flex justify-between flex-col gap-2  items-center  '> 
            <img className='h-20' src='https://png.pngtree.com/png-clipart/20231005/original/pngtree-cab-icon-vector-image-symbol-transport-design-vector-png-image_12962757.png'/>
            <div className='w-full'>
                <div className='flex items-center gap-3  '> 
                <i className=" text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '> 566- A </h3>
                    <p className=' text-base text-gray '> {props.pickup} </p>
                </div>
                </div>
                <div>
                <div className='flex items-center gap-3  '> 
                <i className="ri-map-pin-range-fill"></i>
               <div>
                    <h3 className='text-lg font-medium '> 566- A </h3>
                    <p className=' text-base text-gray '> {props.destination} </p>
                </div>
                </div>
                    
                    
                     </div>
                <div>
                <div className='flex items-center gap-3  '> 
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '> {props.fare[props.vehicleType]} </h3>
                    <p className=' text-base text-gray '> Cash </p>
                </div>
                </div> </div>



            </div>
            </div>
        
    </div>
    )
    
}
export default Lookingfordriver 