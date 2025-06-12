import './App.css'
import './index.css'

import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Start from  './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import UserProtectorWrapper from './pages/UserProtectorWrapper.jsx';
import CaptainProtectorWrapper from './pages/CaptainProtectorWrapper.jsx'
import Riding from './pages/Ridingcaptain'
import Lookingfordriver from './components/Lookingfordriver.jsx'
import CaptainRidding from './pages/CaptainRiding.jsx'
import 'leaflet/dist/leaflet.css';
import Map from './pages/Map.jsx'


import Home  from './pages/Home.jsx';

import UserSignup from './pages/UserSignup.jsx';
import Userlogout from './pages/UserLogout.jsx';
import Captainlogout from './pages/CaptainLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'


import React from 'react';
const  App=()=>{
  return (
    <div> 
      <Routes>
        <Route path='/' element ={<Start />}/>
        <Route path='/login' element ={<UserLogin />}/>
        <Route path='/signup' element ={<UserSignup />}/>
        <Route path='/riding' element ={<Riding/>}/>

       
      <Route path='/home' element={<UserProtectorWrapper>
        <Home />
        </UserProtectorWrapper>}/>
        <Route path='/users/logout' element ={<UserProtectorWrapper>
          <Userlogout> </Userlogout>
        </UserProtectorWrapper>}/>
        <Route path='/captain-login' element={<CaptainLogin />}/>
        <Route path='/captain-signup' element={<CaptainSignup />}/>
        <Route path='/captain-home' element ={<CaptainProtectorWrapper>
          <CaptainHome />
          </CaptainProtectorWrapper>}/>
          <Route path='/captain-logout' element={<CaptainProtectorWrapper>
            <Captainlogout> </Captainlogout>
          </CaptainProtectorWrapper>}/>
          <Route path='/captain-riding' element={<CaptainRidding/>}/>
          <Route path='/map' element={<Map/>}> </Route>

        </Routes>
      
     
    </div>
  
  )
}
export default App;