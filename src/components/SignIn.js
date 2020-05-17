import React, {useState} from "react";
import axios from 'axios'
import socket from "../socket";

function SignIn ({onLogin}) {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onEnter = async () => {
    if(!roomId || !userName){
      return alert('Неверные данные')
    }
    setLoading(true)
    await axios.post('/rooms', {
      roomId,
      userName
    })
    onLogin()
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
       <button
          disabled={isLoading}
          onClick={onEnter}>
         {
           isLoading ? 'Entry...' : 'Login'
         }
       </button>
     </div>
  )
}

export default SignIn;