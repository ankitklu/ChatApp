import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import {Routes, Route} from "react-router-dom"
import Home from "./components/Protected_routing/Home"
import Login from "./components/Protected_routing/Login"
// import Chat from "./components/Protected_routing/Chat"
import PageNotFound from "./components/Protected_routing/PageNotFound"
import ProtectedRoute from "./components/Protected_routing/ProtectedRoute"
// import { useAuth } from './components/Protected_routing/AuthContext'

function App() {

  // const {userData, setUserData}= useAuth();

  return (
    <>
    {/* <h1>Routing_App</h1> */}
    <Routes>
        <Route path="/" element={<ProtectedRoute ><Home></Home></ProtectedRoute>} ></Route>
        <Route path='/:chatid' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
    </Routes>
    </>
  )
}

export default App
