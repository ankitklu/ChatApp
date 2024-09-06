import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  CircleFadingPlusIcon,
  LoaderIcon,
  MessageSquare,
  SearchIcon,
  UserRoundIcon,
} from "lucide-react";
import Profile from "./Profile";
import UserCard from "./UserCard";
import { useAuth } from "./AuthContext";

function ChatPanel() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const { userData } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const onBack = () => {
    setShowProfile(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const arrayOfUser = snapshot.docs.map((doc) => ({
        userData: doc.data(),
        id: doc.id,
      }));
      setUsers(arrayOfUser);
      setLoading(false);
    };

    getUsers();
  }, []);

  if (showProfile === true) {
    return <Profile onBack={onBack} />;
  }

  let filteredUsers = users;
  if (searchQuery) {
    filteredUsers = users.filter((user) =>
      user.userData.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  }

  return (
    <div className="bg-white w-[30vw] min-w-[350px]">
      {/* Top bar */}
      <div className="bg-background py-2 px-4 border-r flex justify-between items-center gap-2">
        <button
          onClick={() => {
            setShowProfile(true);
          }}
        >
          <img
            src={userData?.profile_pic || "/default-user.png"}
            alt="profile picture"
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>
        <div className="flex items-end justify-center gap-6 mx-4">
          <CircleFadingPlusIcon className="w-6 h-6" />
          <MessageSquare className="w-6 h-6" />
          <UserRoundIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Chat list */}
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <LoaderIcon className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <>
          <div className="bg-white py-2 px-3">
            <div className="py-2 bg-background flex items-center gap-4 px-3 rounded-lg">
              <SearchIcon className="h-4 w-4" />
              <input
                className="bg-background px-2 py-1 flex-grow outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
            </div>

            <div className="divide-y py-4 h-[calc(100vh-150px)] overflow-y-auto">
              {filteredUsers.map((userObject) => (
                <UserCard userObject={userObject} key={userObject.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatPanel;
