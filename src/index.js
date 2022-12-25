import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app'
import firebaseConfig from './firebase.config';
import Discovery from './Discovery';

//set true to discovery mode
const isDiscoverty = false;

//initialize firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isDiscoverty?<Discovery/>:<App/>}
  </React.StrictMode>
);

reportWebVitals();
