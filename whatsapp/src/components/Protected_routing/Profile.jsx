import React from 'react'
import { ArrowLeft } from "lucide-react";
import { useAuth } from './AuthContext';

function Profile(props) {
  const {userData} = useAuth();
  return (
    <div className='bg-white w-[30vw]'>
      <div className="bg-green-600 text-white py-4 text-lg px-4 flex items-center gap-6">
        <button onClick={props.onBack}>
          <ArrowLeft/>
        </button>
        Profile
      </div>
      <div>
        <img src={userData.profile_pic} alt="" className="rounded-full h-10 w-10"/>
        <h2>{userData.name}</h2>
        <h2>{userData.status}</h2>
      </div>
    </div>
  )
}

export default Profile