import React, {useReducer} from 'react';
import socket from "./socket";
import SignIn from "./components/SignIn";
import reducer from "./reducer";



function App () {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false
  })

  const onLogin = () => {
    dispatch({
      type:'IS_AUTH',
      payload: true
    })
  }
  console.log(state)
  return (
     <div>
       {!state.isAuth && <SignIn onLogin={onLogin}/>}
     </div>
  );
}

export default App;
