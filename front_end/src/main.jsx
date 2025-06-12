import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from'react-router-dom'
import UserContext from './context/usercontext.jsx'
import CaptainContext from './context/captaincontext.jsx'
import SocketContext from './context/socketcontext.jsx'
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CaptainContext>
  <UserContext>
    <SocketContext>   
  <BrowserRouter>
  <App> </App>
  </BrowserRouter>
  </SocketContext>

   
      </UserContext>
      </CaptainContext>
      </StrictMode>
)
