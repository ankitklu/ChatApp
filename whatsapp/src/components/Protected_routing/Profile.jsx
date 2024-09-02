import React from "react";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const { userData } = useAuth();
  const navigate = useNavigate();

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
      <div className="bg-white w-[30vw]">
        <img
          src={userData.profile_pic}
          alt=""
          className="rounded-full h-10 w-10"
        />
        <h2>{userData.name}</h2>
        <h2>{userData.email}</h2>
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
