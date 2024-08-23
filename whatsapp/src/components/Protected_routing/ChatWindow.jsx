import { doc } from "firebase/firestore";
import { MessageSquareText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ChatWindow() {
  const params = useParams();
  // const [secondUser, setSecondUser] = useState();
  // const [secondUserLoading, setSecondUserLoading] = useState(true);

  console.log("Chat params", params);
  if (!params.chatid) {
    return (
      <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
        <MessageSquareText
          className="w-28 h-28 text-gray-400"
          strokeWidth={1.2}
        />
        <p className="text-sm text-center text-gray-400">
          select any contact to
          <br />
          start a chat with.
        </p>
      </section>
    );
  }

  // const recieverId = params.chatid;

  // useEffect(() => {
  //   const getUser = async () => {
  //     const docRef = doc(db, "users", recieverId);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setSecondUser(docSnap.data());
  //     }
  //     setSecondUserLoading(false);
  //   };
  //   getUser();
  // }, []);

  return (
    <>
      <h2>Chat: {params.chatid}</h2>
      {/* <div>
        <div>
          {secondUserLoading == true ? (
            <div> ....Loading......</div>
          ) : (
            <div>User present</div>
          )}
        </div>
      </div> */}
    </>
  );
}

export default ChatWindow;
