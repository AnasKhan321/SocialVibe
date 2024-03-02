
import React, { useState , useContext , useEffect } from 'react';
import logo from '../../Images/logo.png'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import {MyContext} from '../../ContextApi/MyContext.js'
import { useNavigate , Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {SaveToLocal} = useContext(MyContext)
  const handleChange = (e)=>{
    if(e.target.name == "email"){
      setemail(e.target.value)
    }
    else{
      setpassword(e.target.value)
    }
  }

  // Submitting the Form 

  const handleSubmit = (e)=>{
    e.preventDefault()
      const postData = {
        email : email , 
        password : password
      };

      fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData) 
      })
        .then(response => {
          setemail("")
          setpassword("")
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
         
          return response.json();
        })
        .then(data => {
          if(data.success){
            SaveToLocal(data.token)
            toast.success('Log In Successfully'); 
              navigate('/')
          }else{
            toast.error(data.error);
          }
        })
        .catch(error => {
          console.error('Post request error:', error);
        });

}


// Try to login with Google 
const LoginWithGoogle= (credentials)=>{
  const {email} = jwtDecode(credentials.credential)
  const postData = {
    email : email , 
    
  };
  fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/loginWithGoogle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData) 
  })
    .then(response => {
      setemail("")
      setpassword("")
      if (!response.ok) {
        toast.error(response.error);
      }
     
      return response.json();
    })
    .then(data => {
      if(data.success){
        SaveToLocal(data.token)
        toast.success('Log In Successfully');
      }else{
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    })
    .catch(error => {
      console.error('Post request error:', error);
    });
}
  return(
    <div className = "">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto  w-44" src={logo} alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-yellow-500 ">Login Into Social Vibe </h2>
  </div>

   {/* input Section  */}

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6"  onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-yellow-600">Email address</label>
        <div className="mt-2">
          <input id="email" value={email} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6" onChange={handleChange} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-yellow-600">Password</label>
          <div className="text-sm">
            <Link to="/forget" className="font-semibold text-yellow-600 hover:text-yellow-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password"  value={password}  type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"  onChange={handleChange}/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Log in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <Link to="/signup" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500">SignUp ? </Link>
    </p>
    <div className="flex justify-center  m-2  ">
    <GoogleLogin
        onSuccess={LoginWithGoogle}
        onError={() => {
          console.log('Login Failed');
        }} 
        className="p-4 "
      />
    </div>
  </div>
</div>
    </div>
  )
};

export default Login;
