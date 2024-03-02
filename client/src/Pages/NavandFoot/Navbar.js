import React, { useState , useContext , useEffect  } from 'react';
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom';
import Home from '../../Images/home-1393-svgrepo-com.svg'
import Profile  from  '../../Images/profile-round-1342-svgrepo-com.svg' 
import Search from "../../Images/search-svgrepo-com.svg"
import Create from "../../Images/create.svg"
import {MyContext} from '../../ContextApi/MyContext.js'

const Navbar = () => {
  const [User, setUser] = useState({})

 const {MyInfo , user , IsAuthenticated , Mytoken ,showDialog, setshowDialog} = useContext(MyContext)

//  Fetching the data of current user 
 const FetchData = async()=>{
      if(IsAuthenticated){
            try {
              const token = Mytoken()
              const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/me`, {
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
  const handleClick = ()=>{
    setshowDialog(true)
    console.log('this is here ')
  }

  useEffect(() => {
    FetchData()
  }, [])
  

  return (
    <div className="h-screen w-64 fixed top-0 left-0 overflow-y-auto m-auto flex  items-start sidebar">
    {/* Sidebar content */}
    <div className="p-4 text-white mt-12  ">
      <div className="Logo"> 
                <Link to="/" className="text-2xl font-bold "> SocialVibe  </Link>
         </div>
      <ul className="mt-10 ">
        <div className="flex  items-center mt-4  p-3  cursor-pointer  nav-item   ">
            <img src={Home} alt="" className='invert'  width="24px "/>
            <Link to="/" className="text-xl   px-2  ">Home </Link>

        </div>

        <div className="flex  items-center  mt-4 nav-item   p-3  cursor-pointer  ">
            <img src={Profile} alt="" className='invert'  width="24px "/>
            <Link to={`/Profile/${User?._id }`} className="text-xl   mx-2  ">Profile  </Link>
        </div>

        <div className="flex  items-center  mt-4 nav-item   p-3  cursor-pointer ">
            <img src={Search} alt="" className='invert'  width="24px "/>
            <Link to="/search" className="text-xl   mx-2  ">Search   </Link>
        </div>

        <div className="flex  items-center  mt-4 nav-item   p-3 cursor-pointer  " >
            <img src={Create} alt="" className='invert'  width="24px "/>
            <Link  to="/createPost"  className="text-xl   mx-2  ">Create    </Link>
        </div>

       



      </ul>
    </div>
  </div>
  )
}

export default Navbar