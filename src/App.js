import {useState} from 'react';
// import { getAuth} from 'firebase/auth';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './home/Home';
import Login from './authentification/Login';
import SignUp from './authentification/SignUp';
function App() {
  // const auth = getAuth();
  const [loggedIn, setLogin] = useState(false);
  return (
    <Router>
        <div className='max-w-md mx-auto px-2'>
        <Routes>
              <Route path='auth_page/' element={<Home loggedIn={loggedIn}/>}/>
              <Route path='auth_page/home' element={<Home loggedIn={loggedIn} setLogin={setLogin}/>}/>
              <Route path='auth_page/login' element={<Login loggedIn={loggedIn} setLogin={setLogin}/>}/>
              <Route path='auth_page/signup' element={<SignUp/>}/>
        </Routes>
       </div>
    </Router>
  );
}

export default App;
