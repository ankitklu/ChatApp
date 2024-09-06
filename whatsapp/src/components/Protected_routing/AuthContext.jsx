import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await setLastSeen(currentUser);
          const { profile_pic, name, email, lastSeen, status } = docSnap.data();

          setUserData({
            id: currentUser.uid,
            profile_pic,
            email,
            name,
            lastSeen,
            status: status ? status : "",
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
      day:"2-digit",
      month:"short"
    });
    await updateDoc(doc(db, "users", user.uid), {
      lastSeen: timeStamp,
    });
  };

  const updateName = async (newName) => {
    await updateDoc(doc(db, "users", userData.id), {
      name: newName,
    });
  };

  const updateStatus = async (newStatus) => {
    await updateDoc(doc(db, "users", userData.id), {
      status: newStatus,
    });
  };

  const uploadPhoto = async (img) => {
    const storageRef = ref(storage, `profile/${userData.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      () => {
        //state is changinf
        setIsUploading(true);
        setError(null);
        //console.log("upload started");
      },
      () => {
        //erro r msg
        setError("Unable to Upload");
        setIsUploading(false);
        alert("Upload failed");
      },
      () => {
        //successful fn
        // On success of upload
        
          getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            // Update the user's document with the new profile picture URL
            await updateDoc(doc(db, "users", userData.id), {
              profile_pic: downloadURL,
            });

            // Update local state with the new profile picture URL
            setUserData({
              ...userData,
              profile_pic: downloadURL,
            });

            // Stop loading and clear any errors
            setIsUploading(false);
            setError(null);
          })
          .catch((error) => {
            console.error("Error updating profile picture: ", error);
            setIsUploading(false);
            setError(error.message);
          });
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, loading, updateName, updateStatus ,uploadPhoto, isUploading, error}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
