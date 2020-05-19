import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import socket from "./socket";
import SignIn from "./components/SignIn";
import reducer from "./reducer";
import Chat from "./components/Chat";
import './app.css'


function App () {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  })

  const onLogin = async (obj) => { // когда пользыватель уже вошел, и всё ок, то я отправляю экшин dispatch, который дает понять что клиент не просто отправил запрос, а отправил упешно, и он скрывает форму
    dispatch({
      type: 'IS_AUTH',
      payload: obj
    })
    socket.emit('ROOM:JOIN', obj) // это значит что нужно отпраыить socket запрос на бэк, и весь сервак узнает о том что пришел этот запрос, когда этот ROOM:JOIN запрос пришел от клиента то я предаю roomId and userName
    const {data} = await axios.get(`/rooms/${obj.roomId}`) // отправляю запрос на сервер, чтоб получить актуальные даные по пользователям и сообщениям
    dispatch({
      type:'SET_DATA',
      payload:data
    })
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers)
    socket.on('ROOM:NEW_MESSAGE', addMessage)
  }, [])


  window.socket = socket;
  return (
     <div className='wrapper'>
       {!state.isAuth ? <SignIn onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
     </div>
  );
}

export default App;
