import React from 'react'
import { ArrowLeft } from "lucide-react";

function Profile(props) {
  return (
    <>
      <div className="bg-green-600 text-white py-4 text-lg px-4 flex items-center gap-6">
        <button onClick={props.onBack}>
          <ArrowLeft/>
        </button>
        Profile
      </div>
      {/* <div>
        <img src={users.profile_pic} alt="" className="rounded-full h-10 w-10"/>
        <h2>{users.name}</h2>
        <h2>{users.status}</h2>
      </div> */}
    </>
  )
}

export default Profile