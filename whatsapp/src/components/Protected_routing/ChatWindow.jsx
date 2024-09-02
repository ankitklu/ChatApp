import { doc, getDoc } from "firebase/firestore";
import { MessageSquareText, PlusIcon, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";

function ChatWindow() {
  const params = useParams();
  const [secondUser, setSecondUser] = useState();
  // const [secondUserLoading, setSecondUserLoading] = useState(true);

  const receiverId= params.chatid;

  const [msg, setMsg]= useState("");

  const handleSendMsg =()=>{
    console.log(msg);
    setMsg("");
  }

  useEffect(()=>{
    //request data fetch
    const getuser = async ()=>{
      const docRef = doc(db ,"users", receiverId);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        console.log("Second user: "+docSnap.data());
        setSecondUser(docSnap.data());
      };
      
    };
    getuser();
  },[receiverId])



  console.log("Chat params", params);


  if (!receiverId) {
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
      {/* <h2>Chat: {params.chatid}</h2> */}
      <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
        <div className="h-full w-full bg-chat-bg flex flex-col">
          <div className="bg-background py-2 px-4 flex items-center gap-2 shadow-sm">
            <img
              src={secondUser?.profile_pic || "/default-user.png"}
              alt="profile-pic"
              className="w-9 h-8 rounded-full object-cover"
            />
            <h2>{secondUser?.name}</h2>
          </div>

          {/* message List */}
          <div className="flex-grow flex flex-col gap-12 p-6 "></div>

          {/* chat input */}
          <div className="bg-background py-3 px-6 shadow flex items-center gap-6">
            <PlusIcon />
            <input type="text" className="w-full py-2 px-4 rounded focus:outline-none" placeholder="Type a message" 
              value={msg}
              onChange={(e)=>{
                setMsg(e.target.value);
              }}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  handleSendMsg();
                }
              }}
            >

            </input>
          <button onClick={handleSendMsg}>
            <SendIcon/>
          </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatWindow;
