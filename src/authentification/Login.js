import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import FailAuth from './FailAuth';
import SucceedAuth from './SucceedAuth';

const Login = ({loggedIn, setLogin}) => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); //navigate hooks

    //login handler
    const onSubmitHandler = (e) => {
        e.preventDefault();
        //login process
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            setLogin(true);
            const id = setTimeout(()=>{
                navigate('/auth_page/home', { replace: true });
                clearTimeout(id);
            },750);
        })
        .catch((error)=>{
            setError(error.message);
        })
    }

    //form component
    const form =  <form onSubmit={onSubmitHandler}>
        <label htmlFor='emailLogin'>
            {error.includes('user-not-found')
            ?<FailAuth error={error} text='user-not-found'/> 
            :'email'}
        </label>
        <input id='elamilLogin' type='email' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor='passLogin'>
            {error.includes('auth/wrong-password')
            ?<FailAuth error={error} text='wrong password!'/>
            :'password'}
        </label>
        <input id='passLogin' type='password' placeholder='password' onChange={(e)=>{setpassword(e.target.value)}}/>
        <input className='bg-red-900 text-white font-extrabold text-lg cursor-pointer active:bg-red-700' type='submit' value='login'/>
    </form>

  return (
    <div>
        <h1>Login</h1>
        {loggedIn?<SucceedAuth text='Logged In'/>:form}
        <p>Or <Link to={'/auth_page/signup'}>Sign Up</Link></p>
    </div>
  )
}

export default Login;