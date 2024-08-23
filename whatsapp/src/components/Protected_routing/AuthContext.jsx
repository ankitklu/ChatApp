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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { uid, photoURL, displayName, email } = docSnap.data();

          setUserData({
            id: uid,
            profile_pic: photoURL,
            email,
            name: displayName,
          });
        }
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
