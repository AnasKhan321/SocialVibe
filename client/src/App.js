import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,useNavigate    } from 'react-router-dom';
import Login from './Pages/Auth/Login.js'; 
import Signup from './Pages/Auth/Signup.js'; 
import Navbar from './Pages/NavandFoot/Navbar.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home.js'
import Profile from './Pages/Profile.js'
import EditProfile from './Pages/EditProfile.js'
import CreatePost from './Pages/CreatePost'; 
import PostDetail from './Pages/PostDetail.js'
import Search from './Pages/Search.js'
import {MyContext} from './ContextApi/MyContext.js'
import React, { useState , useContext , useEffect  } from 'react';
import Following from './Pages/Following.js'
import Follower  from './Pages/Follower.js'
import ForgetPassword from './Pages/Auth/ForgetPassword.js'
import ChangePassword from './Pages/Auth/ChangePassword.js'


function App() {
  const [User, setUser] = useState({})
  const {MyInfo , user , Mytoken , IsAuthenticated} = useContext(MyContext)
  

  const FetchData = async()=>{
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
        setUser(data.user)
        console.log(data)
      } catch (error) {
        console.error('Error:', error);
      }
    }

  
  }

  useEffect(() => {
      FetchData()
      
  }, [])


  const hideNavbarOnRoutes = ['/login', '/signup'];

  // Check if the current route is in the array of routes where Navbar should be hidden
  const shouldHideNavbar = hideNavbarOnRoutes.includes(window.location.pathname);

  // If Navbar should be hidden, don't render it
  const navbar = shouldHideNavbar ? null : <Navbar />;
  



  return (
      <BrowserRouter>
         {navbar}
         <ToastContainer /> 
             <Routes>
                <Route  exact path='/' element= { <Home key="home"/> } />
                <Route  exact path='/signup' element= { <Signup key="signup"/> } />
                <Route exact path='/login'  element={<Login key="Login" />} /> 
                <Route exact path='/Profile/:id'  element={<Profile key="Profile" />} /> 
                <Route  exact path='/edit' element={  <EditProfile key="EditProfile " /> } />
                <Route  exact path="/createPost"  element={<CreatePost key="createPost"/>} />
                <Route  exact path="/Post/:id"  element={<PostDetail key="PostDetail"/>} />
                <Route   exact path="/search"  element={<Search  key="search" />} />
                <Route   exact path="/following/:id"  element={<Following  key="following" />} />
                <Route   exact path="/follower/:id"  element={<Follower  key="follower" />} />
                <Route exact path="/forget" element={<ForgetPassword  key="forgetPassword" />} />
                <Route exact path="/ChangePassword/:email"  element={<ChangePassword  key="changePassword" />}  />


             </Routes>
      </BrowserRouter>
  );
}

export default App;
