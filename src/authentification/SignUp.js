import React, { useReducer} from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SucceedAuth from './SucceedAuth';
import FailAuth from './FailAuth';

//reducer function
function reducer(state, action){
    switch(action.type){
        case 'setEmail':
            return {...state, email:action.email};
        case 'setPassword':
            return {...state, password:action.password};
        case 'setName':
            return {...state, name:action.name};
        case 'setText':
            return {...state, text:action.text};
        case 'setError':
            return {...state, error:action.error};
        case 'setSucced':
            return {...state, succed:action.succed};
        default:
            throw new Error();
    }
}

//initial state
const initialState = {
    email:'',
    password:'',
    name:'',
    text:'',
    error:'',
    succed:false
}

const SignUp = () => {
    const auth = getAuth();

    const [state, dispatch] = useReducer(reducer,initialState);

    const navigate = useNavigate();

    //login handler
    const onSubmitHandler = (e) => {
        e.preventDefault();
        //signup process
        createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((e)=>{
            const db = getDatabase();
            const uid = e.user.uid;
            set(ref(db, 'users/'+uid),
            {
                name:state.name,
                email:state.email,
                text:state.text,
            })
            dispatch({type:'setSucced', succed:true});
            const id = setTimeout(()=>{
                navigate('/auth_page/home', { replace: true });
                clearTimeout(id);
            },750);
        })
        .catch((error)=>{
            dispatch({type:'setError', error:error.message});
        })
    }
    
    const form =  <form onSubmit={onSubmitHandler}>
            <label htmlFor='emailSignUp'>
                {state.error.includes('email-already-in-use')
                ?<FailAuth error={state.error} text='user already exist'/>
                :'email'}
            </label>
            <input id='elamilSignUp' type='email' placeholder='email' onChange={(e)=>{dispatch({type:'setEmail', email:e.target.value})}}/>

            <label htmlFor='passSignUp'>password</label>
            <input id='passSignUp' type='password' placeholder='password' onChange={(e)=>{dispatch({type:'setPassword', password:e.target.value})}}/>

            <label htmlFor='signUpName'>Name</label>
            <input id='signUpName' type='text' placeholder='name' onChange={(e)=>{dispatch({type:'setName', name:e.target.value})}}/>
            
            <label htmlFor='description'>Write Anything</label>
            <textarea id='description' type='text' onChange={(e)=>{dispatch({type:'setText', text:e.target.value})}}/>

            <input className='bg-red-900 text-white font-extrabold text-lg cursor-pointer active:bg-red-700' type='submit' value='Sign Up'/>
    </form>
  return (
    <div>
        <h1>Sign Up</h1>
        {state.succed?<SucceedAuth text='Succeed'/>:form}
        <p>Or <Link to={'/auth_page/login'}>login</Link></p>
    </div>
  )
}

export default SignUp;

