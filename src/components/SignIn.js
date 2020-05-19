import React, {useState} from "react";
import axios from 'axios'

function SignIn ({onLogin}) {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные')
    }

    const obj = {
      roomId,
      userName
    }
    setLoading(true)
    await axios.post('/rooms', obj)
    onLogin(obj) // когда я получил ответ от сервера и проверел что явошел, то я иду в Арр исмотрю в onLogin)))))
  }
  return (
     <div className='join-block'>
       <div className="form">
         <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}/>
         <input
            type="text"
            placeholder="You name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}/>
         <button
            class="btn waves-effect waves-light"
            disabled={isLoading}
            className="btn btn-success"
            onClick={onEnter}>
           {
             isLoading ? 'Entry...' : 'Login'
           }
         </button>
       </div>

     </div>
  )
}

export default SignIn;