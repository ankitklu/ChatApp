import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import {Routes, Route} from "react-router-dom"
import Home from "./components/Protected_routing/Home"
import Login from "./components/Protected_routing/Login"
import Chat from "./components/Protected_routing/Chat"
import PageNotFound from "./components/Protected_routing/PageNotFound"
import ProtectedRoute from "./components/Protected_routing/ProtectedRoute"

function App() {

  const [isLoggedIn, setIsLoggedIn]= useState(false);

  return (
    <>
    {/* <h1>Routing_App</h1> */}
    <Routes>
        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home setIsLoggedIn={setIsLoggedIn}></Home></ProtectedRoute>} ></Route>
        <Route path='/chat/:uniqueid' element={<ProtectedRoute isLoggedIn={isLoggedIn}><Chat/></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} ></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App
