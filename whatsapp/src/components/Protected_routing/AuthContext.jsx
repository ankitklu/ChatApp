import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await setLastSeen(currentUser);
          const { profile_pic, name, email, lastSeen ,status} = docSnap.data();

          setUserData({
            id: currentUser.uid,
            profile_pic,
            email,
            name,
            lastSeen,
            status: status?status:""
          });
        }
      }
      setLoading(false);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe(); //when image doesn't loads
  }, []);

  const setLastSeen = async (user) => {
    const date = new Date();
    const timeStamp = date.toLocaleString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    await updateDoc(doc(db, "users", user.uid), {
      lastSeen: timeStamp,
    });
  };

  const updateName=async(newName)=>{
    await updateDoc(doc(db,"users", userData.id),{
      name: newName
    });
  }

  const updateStatus= async(newStatus)=>{
    await updateDoc(doc(db,"users",userData.id),{
      status: newStatus
    });
  }


  return (
    <AuthContext.Provider value={{ userData, setUserData, loading ,updateName,updateStatus}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
