import React from 'react'
import { useParams } from 'react-router-dom'

function Chat() {
    const params= useParams();
    console.log("Chat params",params);
    if(params.chatid){
      return <h2>Chat: {params.chatid}</h2>
    }
  return (
    <h2>Chat: Empty String</h2>
  )
}

export default Chat