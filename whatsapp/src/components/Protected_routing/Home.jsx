import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

function Home(props) {
  const setIsLoggedIn= props.setIsLoggedIn;
  const navigate= useNavigate();
  const handleLogout=async()=>{

    await signOut(auth)

    setIsLoggedIn(false);
    // alert("Logout successful");
    navigate('/login');
  }
  return (
    <>
    <div>Home</div>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Home