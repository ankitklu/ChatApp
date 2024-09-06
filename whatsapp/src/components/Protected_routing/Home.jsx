import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ChatPanel from "./ChatPanel";
import Chat from "./ChatWindow";

function Home(props) {
  // const setIsLoggedIn = props.setIsLoggedIn;
  // const navigate = useNavigate();

  // const handleChange=(e)=>{
  //   const img= e.target.files[0];

  //   const storageRef= ref(storage, "/profile") + Math.random();

  //   //when the upload takes time, there is a inbuilt function which takes 2 params, mainly:- storage refernce and image
  //   const uploadTask= uploadBytesResumable(storageRef, img);

  //   //developer do this for better understanding
  //   uploadTask.on("state_changed", progressCB , errorCB, finishedCB);

  //   function progressCB(data){
  //     //console.log("Data: ", data);
  //   }

  //   function errorCB(err){
  //     //console.log(err);
  //   }

  //   function finishedCB(){
  //     //console.log("Success: ");
  //     getDownloadURL(uploadTask.snapshot.ref).then(function(url){
  //       //console.log("url is: ", url);
  //     })
  //   }

  // }

  // const handleLogout = async () => {
  //   // const {userData}= useContext();
  //   await signOut(auth);

  //   setIsLoggedIn(false);
  //   // alert("Logout successful");
  //   navigate("/login");
  // };

  return (
    <main className="relative w-full h-screen bg-[#E3E1DB]">
      <div className="absolute top-0 h-[130px] bg-primary w-full"></div>
      <div className="h-screen absolute w-full p-5">
        {/* <div>Home</div> */}
        {/* <input type="file" accept="image/png image/jpeg image/jpg image/webp" onChange={handleChange} ></input> */}
        <div className="bg-[#eff2f5] w-full h-full shadow-md flex">
          <ChatPanel />
          <Chat />
        </div>
      </div>
      
    </main>
  );
}

export default Home;
