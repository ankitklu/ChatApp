import React, { useState } from "react";
import { ArrowLeft, CheckIcon } from "lucide-react";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const { userData, updateName,updateStatus } = useAuth();
  const navigate = useNavigate();
  const [name, setName]= useState(userData?.name || "");
  const [status, setStatus]= useState(userData?.status || "Hey there !! this is Ankit's WA Clone");


  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-white w-[30vw]">
      <div className="bg-green-600 text-white py-4 text-lg px-4 flex items-center gap-6">
        <button onClick={props.onBack}>
          <ArrowLeft />
        </button>
        Profile
      </div>
      <div className="bg-gray-100">
        <img
          src={userData.profile_pic}
          alt=""
          className="rounded-full h-10 w-10"
        />
        <h2>{userData.name}</h2>
        <h2>{userData.email}</h2>

        <div className="flex flex-col bg-white w-full py-4 px-8">
          <label className="text-sm text-primary-dense mb-2">Your name</label>
          <div className="flex items-center w-full">
            <input
            value ={name} className="w-full bg-transparent" placeholder="Update your status" onChange={(e)=>{setName(e.target.value)}}/>
            <button onClick={()=>{updateName(name)}}>
              <CheckIcon className="w-5 h-5"/>
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-white w-full py-4 px-8">
          <label className="text-sm text-primary-dense mb-2">Your status</label>
          <div className="flex items-center w-full">
            <input
            value ={status} className="w-full bg-transparent" placeholder="Update your status" onChange={(e)=>{setStatus(e.target.value)}}/>
            <button onClick={()=>{updateStatus(status)}}>
              <CheckIcon className="w-5 h-5"/>
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-white px-4 py-3 rounded bg-[#04a784] hover:bg-[#008069]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
