import React, { useState } from 'react'
import { Routes , Route, Navigate} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Chat from './Chat'
import ProtectedRoute from './ProtectedRoute'

function Routing_App() {

    const [isLoggedIn, setIsLoggedIn]= useState(false);

  return (
    <>
    {/* <h1>Routing_App</h1> */}
    <Routes>
        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home setIsLoggedIn={setIsLoggedIn}></Home></ProtectedRoute>} ></Route>
        <Route path='/chat/:uniqueid' element={<ProtectedRoute isLoggedIn={isLoggedIn}><Chat/></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} ></Route>
    </Routes>
    </>
  )
}


export default Routing_App