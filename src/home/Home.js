import React, { useEffect, useState } from 'react'
import { getDatabase,ref, child, get, set } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import WriteMode from './WriteMode';
import ReadMode from './ReadMode';

const Home = ({loggedIn, setLogin}) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [idxColumOnEdit, setIdxColumOnEdit] = useState(-99);
    const [tempTextInput, setTempTextInput] = useState('');
    const [onEditMode, setOnEditMode] = useState(false);

    const navigate = useNavigate() // useNavigate Hooks

    //rederect if user not login to login page
    useEffect(()=>{
        if(loggedIn){
            navigate('/auth_page/home', { replace: true });
        }else{
            navigate('/auth_page/login', { replace: true });
        }
    },[navigate,loggedIn])

    //get data if user logged in
    if(loggedIn && onEditMode===false){
        const userId = auth.currentUser.uid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setName(data.name);
                setEmail(data.email);
                setText(data.text)
            } else {
              console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    //signout handler
    const signOutHandler = () => {
        signOut(auth)
        .then(()=>{
            navigate('/auth_page/login', { replace: true });
            setLogin(false);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    const ActivateEditMode = (id) =>{
        setIdxColumOnEdit(id);
        switch(id){
            case 0:
                setTempTextInput(name)
                break
            case 1:
                setTempTextInput(email)
                break
            case 2:
                setTempTextInput(text)
                break
            default:
                break
        }
        setOnEditMode(true);
    }
    
    const commitChangeHandler = (e) =>{
        e.preventDefault();
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        let data = {name, email, text};
        switch(idxColumOnEdit){
            case 0:
                data = {...data,name:tempTextInput}
                break
            case 1:
                data = {...data,email:tempTextInput}
                break
            case 2:
                data = {...data,text:tempTextInput}
                break
            default:
                data = {};
                break
        }
        set(ref(db, 'users/'+ userId),data)
        setIdxColumOnEdit(-99);
        setOnEditMode(false);
        setTempTextInput('');
    }

    const inputChangeHandler = (e) => {
        const input = e.target.value;
        setTempTextInput(input);
    }

  return (
    <div>
        <h1>Your Data</h1>

        <label>Name</label>
        {idxColumOnEdit===0
        ?<WriteMode onSubmit={(e)=>{commitChangeHandler(e)}} data={onEditMode?tempTextInput:name} onInputChange={(e)=>{inputChangeHandler(e)}}/>
        :<ReadMode onClick={()=>{ActivateEditMode(0)}} data={name}/>}
        <br/>

        <label>Email</label>
        {idxColumOnEdit===1
        ?<WriteMode onSubmit={(e)=>{commitChangeHandler(e)}} data={onEditMode?tempTextInput:email} onInputChange={(e)=>{inputChangeHandler(e)}}/>
        :<ReadMode onClick={()=>{ActivateEditMode(1)}} data={email}/>}
        <br/>

        <label>Description</label>
        {idxColumOnEdit===2
        ?<WriteMode onSubmit={(e)=>{commitChangeHandler(e)}} data={onEditMode?tempTextInput:text}  onInputChange={(e)=>{inputChangeHandler(e)}}/>
        :<ReadMode onClick={()=>{ActivateEditMode(2)}} data={text}/>}
        <button className='w-full mb-4 border-2 py-3 px-1 rounded-md bg-red-900 text-white font-extrabold text-lg cursor-pointer active:bg-red-700' onClick={signOutHandler}>Log Out</button>
    </div>
  )
}

export default Home;


