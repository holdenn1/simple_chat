import React from "react";
import socket from "../socket";

function SignIn () {
  return (
     <div>
       <input type="text" placeholder="Room ID"/>
       <br/>
       <input type="text" placeholder="You name"/>
       <br/>
       <button>Sign in</button>
     </div>
  )
}

export default SignIn;