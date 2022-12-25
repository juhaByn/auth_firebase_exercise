import React, { useState } from 'react';
import { getAuth} from 'firebase/auth';
import {BrowserRouter} from 'react-router-dom'
import Login from './authentification/Login'
import SignUp from './authentification/SignUp'
import Home from './home/Home'

const Discovery = () => {
  const auth = getAuth();
  //state to store whether user login or not
  const [loggedIn, setLogin] = useState(auth.currentUser);
  return (
    <BrowserRouter>
      <div className='max-w-2xl mx-auto'>
          <h1>Login</h1>
          {/* the mandatory props is loggedIn and setLogin to change the state of login status*/}
          <Login loggedIn={loggedIn} setLogin={setLogin}/>
          <h1>Sign Up</h1>
          <SignUp/>
          <h1>Home</h1>
           {/* the mandatory props is loggedIn and setLogin to change the state of login status*/}
          <Home loggedIn={loggedIn} setLogin={setLogin}/>
      </div>
    </BrowserRouter>
  )
}

export default Discovery