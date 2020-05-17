import React, {useState} from "react";
import axios from 'axios'
import socket from "../socket";

function SignIn () {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')

  const onEnter = () => {
    if(!roomId || !userName){
      return alert('Неверные данные')
    }
    axios.post('/rooms', {
      roomId,
      userName
    })
    console.log(roomId, userName)
  }
  return (
     <div>
       <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}/>
       <br/>
       <input
          type="text"
          placeholder="You name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}/>
       <br/>
       <button onClick={onEnter}>Sign in</button>
     </div>
  )
}

export default SignIn;