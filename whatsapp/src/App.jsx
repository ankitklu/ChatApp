// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import {Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Chat from "./components/Chat"
import PageNotFound from "./components/PageNotFound"

function App() {

  return (
    <>
      <h1> Whatsapp Clone</h1>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/chat/:uniqueid' element={<Chat/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
