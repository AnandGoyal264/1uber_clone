import React from 'react'
const Waitingfordriver=(props)=>{
    return (
       
        <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'
         ><i className="ri-arrow-down-wide-fill"></i>
             </h5>
           
            <div className='flex justify-between flex-col gap-2  items-center  '> 
            <img className='h-12' src='https://png.pngtree.com/png-clipart/20231005/original/pngtree-cab-icon-vector-image-symbol-transport-design-vector-png-image_12962757.png'/>
            <div className='text-right'>
                <h2 className=' text-lg font-medium '>{props.driverdata?.captain?.fullname.firstname} </h2>
                
                <h4 className='text-xl font-semibold '>{props.driverdata?.captain?.vehicle.plate} </h4>
                <p className='text-sm text-gray-600'> {props.driverdata?.captain?.vehicle.color}  </p>
                
                </div>
              
                <div>
                <div className='flex items-center gap-3  '> 
                <i className="ri-map-pin-range-fill"></i>
               <div>
                    <h3 className='text-lg font-medium '> {props.driverdata?.otp} </h3>
                    <p className=' text-base text-gray '> {props.driverdata?.destination} </p>
                </div>
                </div>
                    
                    
                     </div>
                <div>
                <div className='flex items-center gap-3  '> 
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='text-lg font-medium '> {props.driverdata?.fare} </h3>
                    <p className=' text-base text-gray '> Cash </p>
                </div>
                </div> </div>



            </div>
            </div>
        
    
    )
}
export default Waitingfordriver 