import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth,db } from "../../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { Fingerprint, LogIn } from "lucide-react";
import { doc,setDoc } from "firebase/firestore";



async function createUser(authData){
  const userObject= authData.user;
  // const uid= userObject.uid;
  // const photoURL= userObject.photoURL;
  // const name= userObject.displayName;
  // const email= userObject.email;

  const {uid, photoURL,displayName, email}= userObject;

  await setDoc(doc(db, "users", uid),{
    email,
    profile_pic: photoURL,
    name:displayName
  })

  console.log("id: ",uid," ", photoURL);
}


function Login(props) {
  const setIsLoggedIn = props.setIsLoggedIn;
  const navigate = useNavigate();

  const handleLogin = async () => {

    if(props.isLoggedIn){
      navigate("/");
      return;
    }

    const user = await signInWithPopup(auth, new GoogleAuthProvider());
    createUser(user);

    console.log(user);

    setIsLoggedIn(true);
    // alert("Logged in");
    navigate("/");
  };

  return (
    <>
      <div className="h-[220px] bg-[#04a784]">
        <div className="flex ml-[200px] pt-[40px] items-center gap-[16px]">
          <img src="logo.png" alt="" style={{ height: "50px" }} />
          <div className="text-white uppercase font-bold">WhatsApp</div>
        </div>
      </div>
      <div className="h-[calc(100vh-220px)] bg-[#eff2f5] flex justify-center items-center relative">
        <div className="h-[80%] w-[50%] bg-white shadow-2xl flex flex-col gap-4 justify-center items-center absolute -top-[93px]">
          <Fingerprint
            className="h-[100px] w-[100px] text-[#04a784]"
            strokeWidth={-1}
          />
          <div className="font-bold text-xl">Sign In</div>
          <div>Sign in with your Google account to get started</div>
          <button
            onClick={handleLogin}
            className="flex gap-2 items-center bg-[#04a784] text-white p-3.5 rounded-[5px] hover:bg-[#038a67] transition-colors"
          >
            <div>Sign in with Google</div>
            <LogIn />
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
