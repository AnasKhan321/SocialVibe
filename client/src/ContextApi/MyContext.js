import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const MyContext = createContext();

const MyMediaProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [user, setuser] = useState({}); 
    const [showDialog, setshowDialog] = useState(false)

    const SaveToLocal= (token)=>{
      localStorage.setItem('SocialUser', token);
    }

    const IsAuthenticated = () =>{
      if(localStorage.getItem('SocialUser') == null){
        return false 
      }
      else{
         return true 
      }
    }
    const Mytoken = ()=>{
      if(IsAuthenticated){
        return localStorage.getItem('SocialUser')
      }else{
        return ""
      }
    }
 

    const MyInfo = async()=>{
     
      if(IsAuthenticated){
        try {
          const token = Mytoken()
          const response = await fetch('http://localhost:8000/api/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
      
          const data = await response.json();
          await setuser(data.user)
          return data.user 
        } catch (error) {
          console.error('Error:', error);
          return {}
        }
    }
  }

    return (
      <MyContext.Provider value={{ count, setCount , SaveToLocal , IsAuthenticated  , Mytoken , MyInfo , user , showDialog, setshowDialog }}>
        {children}
      </MyContext.Provider>
    );
  };
  

export { MyContext, MyMediaProvider };