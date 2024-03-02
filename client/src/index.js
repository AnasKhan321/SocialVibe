import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {MyMediaProvider} from './ContextApi/MyContext.js'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <MyMediaProvider>
  <GoogleOAuthProvider clientId="1021655303296-pndmoesph1mgg5uqo3rr4c68v990tfjk.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>;
  </MyMediaProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
