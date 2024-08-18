import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
// import Routing_App from './components/Protected_routing/Routing_App.jsx';
// import User from './components/Protected_routing/useEffect/User.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <App />
    {/* <Routing_App/> */}
    {/* <User/> */}
  </BrowserRouter>
  </StrictMode>,
)
