import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { MessageSquareText, PlusIcon, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { useAuth } from "./AuthContext";

function ChatWindow() {
  const params = useParams();
  const [secondUser, setSecondUser] = useState();
  const {userData}= useAuth();
  // const [secondUserLoading, setSecondUserLoading] = useState(true);

  const receiverId= params.chatid;
  const [msgList, setMsgList]= useState([]); 


  const chatId= userData?.id > receiverId ? `${userData.id}-${receiverId}` : `${receiverId}-${userData?.id}`;

  const [msg, setMsg]= useState("");

  const handleSendMsg =async()=>{
    if(msg){

      const date= new Date();
      const timeStamp = date.toLocaleString("en-us",{
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });

      //start the chat
      if(msgList?.length==0){
        await setDoc(doc(db,"user-chats", chatId),{
          chatId: chatId,
          messages:[
            {
              text:msg,
              time: timeStamp,
              sender: userData.id,
              receiver: receiverId
            },
          ],
        });
      }
      else{
        //upadate the messafe list
        await updateDoc(doc(db,"user-chats", chatId),{
          chatId:chatId,
          messages:arrayUnion({
            text:msg,
            time:timeStamp,
            sender:userData.id,
            receiver: receiverId
          }),
        });
      }

      setMsg("");
    }
    // //console.log(msg);
  }

  useEffect(()=>{
    //request data fetch
    const getuser = async ()=>{
      const docRef = doc(db ,"users", receiverId);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        //console.log("Second user: "+docSnap.data());
        setSecondUser(docSnap.data());
      };
      
    };
    getuser();

    const msgUnsubscribe = onSnapshot(doc(db,"user-chats", chatId),(doc)=>{
      setMsgList(doc.data()?.messages || [])
    })
    return ()=>{
      msgUnsubscribe();
    }

  },[receiverId])



  //console.log("Chat params", params);


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
            <div>
              <h2>{secondUser?.name}</h2>
              {secondUser?.lastSeen && (
                <p className="text-xs text-neutral-400">last seen at {secondUser?.lastSeen}</p>
              )}
            </div>
          </div>

          {/* message List */}
          <div className="flex-grow flex flex-col gap-12 p-6 overflow-y-scroll">
            {msgList?.map((m,index)=>(
              <div
              key ={index}
              data-sender={m.sender===userData.id}
              className={`bg-white w-fit rounded-md p-2 shadow-sm max-w-[400px] break-wods data-[sender=true]:ml-auto data-[sender=true]:bg-primary-light`}>
                <p>{m?.text}</p>
                <p className="text-xs text-neutral-500 text-end">
                  {m?.time}
                </p>
              </div>
            ))}
          </div>

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
