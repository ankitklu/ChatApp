import React, { useState } from "react";
import { ArrowLeft, CheckIcon, Edit2Icon, LoaderIcon } from "lucide-react";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const {
    userData,
    updateName,
    updateStatus,
    uploadPhoto,
    isUploading,
    error,
  } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(userData?.name || "");
  const [status, setStatus] = useState(
    userData?.status || "Hey there !! this is Ankit's WA Clone"
  );

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-background w-[30vw]">
      <div className="bg-green-600 text-white py-4 text-lg px-4 flex items-center gap-6">
        <button onClick={props.onBack}>
          <ArrowLeft />
        </button>
        Profile
      </div>
      <div className="flex flex-col items-center justify-center gap-8 mt-8">
        <label className={`group relative cursor-pointer rounded-full overflow-hidden ${isUploading ? "pointer-events-none":""}` }>
          <img
            src={userData.profile_pic}
            alt="profile picture"
            className="w-[160px] h-[160px] object-cover rounded-full"
          />
          {isUploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
              <LoaderIcon className="w-6 h-6 text-primary-dense animate-spin z-10" />
            </div>
          ) : (
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30">
              <Edit2Icon className="w-6 h-6 text-white" />
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              uploadPhoto(e.target.files?.[0]);
            }}
            className="hidden"
          />
        </label>


        {/* {isUploading && <h2>...Loading</h2>} */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <h2>{userData.name}</h2>
        <h2>{userData.email}</h2>

        <div className="flex flex-col bg-white w-full py-4 px-8">
          <label className="text-sm text-primary-dense mb-2">Your name</label>
          <div className="flex items-center w-full">
            <input
              value={name}
              className="w-full bg-transparent"
              placeholder="Update your status"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateName(name);
              }}
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-white w-full py-4 px-8">
          <label className="text-sm text-primary-dense mb-2">Your status</label>
          <div className="flex items-center w-full">
            <input
              value={status}
              className="w-full bg-transparent"
              placeholder="Update your status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
            <button
              onClick={() => {
                updateStatus(status);
              }}
            >
              <CheckIcon className="w-5 h-5" />
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
