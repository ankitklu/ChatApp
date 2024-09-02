import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const {profile_pic, name, email } = docSnap.data();

          setUserData({
            id: currentUser.uid,
            profile_pic,
            email,
            name,
          });
        }
      }
      setLoading(false);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();  //when image doesn't loads
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData , loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
