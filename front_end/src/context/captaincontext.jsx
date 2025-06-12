import React , {createContext,useState,useContext} from 'react'
export const  CaptainDataContext=createContext()



export const useCaptain=()=>{
    const context=useContext(CaptainDataContext)
    if (!context){
        throw new Error('useCaptain must be used within a CpatainProvider')
    }
    return context;
}
const CaptainContext=({children})=>{
    const[captain,setcaptain]=useState(null)
    const [isloading,setisloading]=useState(false)
    const [error,seterror]=useState(null)
    
    const updateCaptain=(captaindata)=>{
        setcaptain(captaindata)
    }
    const value={
        captain,
        setcaptain,
        isloading,
        setisloading,
        error,
        seterror,
        updateCaptain

    };
    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )


}
export default CaptainContext;

